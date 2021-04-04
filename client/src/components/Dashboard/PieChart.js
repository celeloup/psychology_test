import React from 'react'
import usePieChart from './PieChartHook'

export const PieChart = props => {  
  
  const { draw, labels, colors, ...rest } = props
  const canvasRef = usePieChart(draw)
  
  return(
	  <div className="piechart">
		  <canvas ref={canvasRef} {...rest} width="200" height="200"/>
		  <div>
			  { labels.map((lab, index) => {
				  return <div key={index} className="piechart_label" colordata={colors[index]}>{lab}</div>
			  })}
		  </div>
	  </div>
  ) 
}