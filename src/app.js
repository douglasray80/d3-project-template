import {
	axisBottom,
	axisLeft,
	format,
	max,
	scalePoint,
	scaleLinear,
	select,
	csv
} from 'd3'

import './styles.scss'

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {
	const xValue = d => d.population
	const yValue = d => d.country

	const margin = { top: 50, right: 40, bottom: 70, left: 150 }
	const innerWidth = width - margin.left - margin.right
	const innerHeight = height - margin.top - margin.bottom

	const xScale = scaleLinear()
		.domain([0, max(data, xValue)])
		.range([0, innerWidth])
		.nice()

	const yScale = scalePoint()
		.domain(data.map(yValue))
		.range([0, innerHeight])
		.padding(0.75)

	const g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	const xAxisTickFormat = number => format('.3s')(number).replace('G', 'B')

	const xAxis = axisBottom(xScale)
		.tickFormat(xAxisTickFormat)
		.tickSize(-innerHeight)

	const yAxis = axisLeft(yScale).tickSize(-innerWidth)

	g.append('g')
		.call(yAxis)
		.select('.domain')
		.remove()

	const xAxisG = g
		.append('g')
		.call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`)

	xAxisG.select('.domain').remove()
	xAxisG
		.append('text')
		.attr('y', 65)
		.attr('x', innerWidth / 2)
		.attr('class', 'axis-label')
		.attr('fill', 'black')
		.text('Population')

	g.selectAll('rect')
		.data(data)
		.enter()
		.append('circle')
		.attr('cy', d => yScale(yValue(d)))
		.attr('cx', d => xScale(xValue(d)))
		.attr('r', 18)

	g.append('text')
		.attr('y', -10)
		.attr('class', 'title')
		.text('Top 10 Most Populous Countries')
}

csv('/data.csv').then(data => {
	data.forEach(d => {
		d.population = +d.population * 1000
	})
	render(data)
})
