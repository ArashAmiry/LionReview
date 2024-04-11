import React, { useEffect } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { Container } from "react-bootstrap";
import '../stylesheets/review_details/RangeQuestionStatistics.css'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


interface QuestionStatisticsProps {
    answers: string[];
}

const RangeQuestionStatistics = ({ answers }: QuestionStatisticsProps) => {

    function generateChartData(arr: string[]) {
        const countsMap: { [label: string]: number } = {
            "Don't know": 0,
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
                    backgroundColor: 'rgb(250,170,13,0.70)',
                    borderColor: 'black',
                    borderWidth: 1
                }
            ]
        };
    
        return { chartData };
    }
    
    const { chartData } = generateChartData(answers);
    
    return (
        <Container className="bar-chart-container d-flex flex-column justify-content-center">
            <Bar className="bar-chart" data={chartData} />
        </Container>
    );
};

export default RangeQuestionStatistics;