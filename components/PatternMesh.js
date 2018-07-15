import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as _ from 'lodash'
import { StackActions, NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	pattern: {
		borderWidth: 4,
		borderColor: '#000',
		borderRadius: 4
	},
	selectedPattern: {
		backgroundColor: '#d3d3d3'
	}
  })

const picked = (length) => Math.floor(Math.random() * length)

const swap = (arr, index) => {
	const elem1 = arr[index]
	const randomIndex = picked(arr.length)
	const elem2 = arr[randomIndex]

	arr[randomIndex] = elem1
	arr[index] = elem2
}

const shuffle = (arr) => {
	let shuffled = arr.slice()
	for(let i = 0; i < shuffled.length; i++){
		swap(shuffled, i)
	}
	return shuffled
}

const patternData = [
	{
		name: 'A',
		subPatterns: [1,2],
		description: 'is cool'
	},
	{
		name: 'B',
		subPatterns: [1,3],
		description: 'is really cool'
	},
	{
		name: 'C',
		subPatterns: [2,3],
		description: 'is amazing'
	}
]

const selections = [1,2,3,4,5,6,7,8,9]

export default class PatternMesh extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			score: 0,
			currentPattern: {},
			patternsUsed: [],
			selectedPatterns: [],
			availableSelections: []
		}
		this.gameStart = this.gameStart.bind(this)
		this.pickRandomPattern = this.pickRandomPattern.bind(this)
		this.generateSelection = this.generateSelection.bind(this)
		this.selectPattern = this.selectPattern.bind(this)
		this.checkMatch = this.checkMatch.bind(this)
	}

	componentDidMount(){
		this.gameStart()
	}

	gameStart(){
		const current = this.pickRandomPattern()
		this.generateSelection(current)
	}

	pickRandomPattern(){
		let selectedPattern = picked(patternData.length)
		while(this.state.patternsUsed.includes(selectedPattern)) selectedPattern = picked(patternData.length)

		this.setState({
			currentPattern: patternData[selectedPattern],
			patternsUsed: [...this.state.patternsUsed, selectedPattern]
		})

		return patternData[selectedPattern]
	}

	generateSelection(current){
		// if(!Object.keys(this.state.currentPattern).length) return null
		const correctSelections = current.subPatterns

		let randomSelectedOne = picked(selections.length)
		while(current.subPatterns.includes(randomSelectedOne)) randomSelectedOne = picked(selections.length)
		let randomSelectedTwo = picked(selections.length)
		while(current.subPatterns.includes(randomSelectedTwo) && randomSelectedTwo !== randomSelectedOne) randomSelectedTwo = picked(selections.length)

		const randomSelections = [randomSelectedOne, randomSelectedTwo]

		const rawSelections = [...correctSelections, ...randomSelections]
		const shuffledSelections = shuffle(rawSelections)

		this.setState({
			availableSelections: shuffledSelections
		})
	}

	selectPattern(patternNum){
		console.log('selecting pattern!!!')
		let newSelection = []
		if(this.state.selectedPatterns.includes(patternNum)){
			newSelection = this.state.selectedPatterns.filter(pattern => pattern !== patternNum)
			this.setState({
				selectedPatterns: newSelection
			})
		}else{
			newSelection = [...this.state.selectedPatterns, patternNum]
			this.setState({
				selectedPatterns: newSelection
			})
		}
		this.checkMatch(newSelection)
	}

	checkMatch(selectedPatterns){
		// console.log('Checking for match!')
		// console.log('Thisnis selected: ', selectedPatterns,selectedPatterns.length)
		const { navigate } = this.props.navigation
		const { currentPattern } = this.state
		if (selectedPatterns.length === 2) {
			if(!_.difference(selectedPatterns, currentPattern.subPatterns).length){
				if(this.state.patternsUsed.length !== patternData.length) {
					this.gameStart()
				}else{
					console.log('ALL LEVELS COMPLETED!')
				}
				this.setState({
					score: this.state.score + 1,
					selectedPatterns: []
				})
			}else{
				console.log('WRONG!', this.props.navigation)
				// const replacer = StackActions.replace({
				// 	key: 'PatternMesh',
				// 	routeName: 'GameOver',
				// 	params: {score: this.state.score}
				// })
				const replacer = StackActions.reset({
					index: 1,
					actions: [
						NavigationActions.navigate({routeName: 'Home'}),
						NavigationActions.navigate({routeName: 'GameOver', params: {score: this.state.score}})
					]
				})
				this.props.navigation.dispatch(replacer)
				// navigate('GameOver', {score: this.state.score})
			}
		}
	}

	render() { 
		const pattern = this.state.currentPattern || {}
		return (
			<View style={styles.container}>
				<Text>Choose the patterns that {pattern.description}</Text>
				<Text>{this.state.score}</Text>
				<View>
					{
						this.state.availableSelections.map((pattern,i) => (
							<View style={this.state.selectedPatterns.includes(pattern) ? styles.pattern : null}>
								<Button onPress={() => this.selectPattern(pattern)} color="#aaa" key={i} title={(pattern).toString()}/>
							</View>
						))
					}
				</View>

			</View>
		);
	}
}

