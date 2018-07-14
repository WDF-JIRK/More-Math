import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
	}
]

const selections = [1,2,3,4,5,6,7,8,9]

export default class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			score: 0,
			currentPattern: {},
			patternsUsed: []
		}
		this.gameStart = this.gameStart.bind(this)
		this.pickRandomPattern = this.pickRandomPattern.bind(this)
		this.generateSelection = this.generateSelection.bind(this)
	}

	componentDidMount(){
		this.gameStart()
	}

	gameStart(){
		this.pickRandomPattern()
	}

	pickRandomPattern(){
		let selectedPattern = picked(patternData.length)
		while(this.state.patternsUsed.includes(selectedPattern)) selectedPattern = picked(patternData.length)

		this.setState({
			currentPattern: patternData[selectedPattern],
			patternsUsed: [...this.state.patternsUsed, selectedPattern]
		})
	}

	generateSelection(){
		console.log('**************************', this.state.currentPattern)
		if(!Object.keys(this.state.currentPattern).length) return null
		const correctSelections = this.state.currentPattern.subPatterns.map((pattern,i) => (
			<View>
				<Text key={i}>{pattern}</Text>
			</View>
		))
		let randomSelectedOne = picked(selections.length)
		while(this.state.currentPattern.subPatterns.includes(randomSelectedOne)) randomSelectedOne = picked(selections.length)
		let randomSelectedTwo = picked(selections.length)
		while(this.state.currentPattern.subPatterns.includes(randomSelectedTwo)) randomSelectedTwo = picked(selections.length)

		const randomSelections = [randomSelectedOne, randomSelectedTwo].map((pattern,i) => (
			<View>
				<Text key={i}>{pattern}</Text>
			</View>
		))

		const rawSelections = [...correctSelections, ...randomSelections]
		const shuffledSelections = shuffle(rawSelections)

		return shuffledSelections
	}

	render() { 
		const pattern = this.state.currentPattern || {}
		return (
			<View style={styles.container}>
				<Text>Choose the patterns that {pattern.description}</Text>
				<View>
					{
						this.generateSelection()
					}
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pattern: {
	  backgroundColor: '#f4f4f4'
  },
  selectedPattern: {
	  backgroundColor: '#d3d3d3'
  }
});
