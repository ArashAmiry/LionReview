import React, { useEffect } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { Container } from "react-bootstrap";
//import '../stylesheets/review_details/BinaryQuestionStatistics.css'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


interface QuestionStatisticsProps {
    answers: string[];
}

const RangeQuestionStatistics = ({ answers }: QuestionStatisticsProps) => {

    function generateChartData(arr: string[]) {
        const countsMap: { [label: string]: number } = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
        };
    
        // Count occurrences of each unique answer within the range of "1" to "5"
        arr.forEach(answer => {
            if (countsMap.hasOwnProperty(answer) && countsMap[answer] !== undefined) {
                countsMap[answer]++;
            } 
        });
    
        // Convert counts map to an array of objects
        const chartData = {
            labels: Object.keys(countsMap), // Use the keys as labels
            datasets: [
                {
                    label: 'Counts',
                    data: Object.values(countsMap), // Use the values as data points
                    backgroundColor: 'pink',
                    borderColor: 'black',
                    borderWidth: 1
                }
            ]
        };
    
        // Calculate the total count of answers displayed in the chart
        const totalCount = Object.values(countsMap).reduce((sum, count) => sum + count, 0);
    
        return { chartData, totalCount };
    }
    
    const { chartData, totalCount } = generateChartData(answers);
    
    return (
        <Container className="pie-chart-container d-flex flex-column justify-content-center">
            <p className="mb-0">answers: {totalCount}</p>
            <Bar className="pie-chart" data={chartData} />
        </Container>
    );
};

export default RangeQuestionStatistics;