import React, { useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
import { Container } from "react-bootstrap";
import './stylesheets/BinaryQuestionStatistics.css'
Chart.register(ArcElement);


interface QuestionStatisticsProps {
    answers: string[];
}

const BinaryQuestionStatistics = ({ answers }: QuestionStatisticsProps) => {

    function generateChartData(arr: string[]): {
        labels: string[];
        values: number[];
    } {
        const counts: { [key: string]: number } = {};

        arr.forEach(label => {
            counts[label] = (counts[label] || 0) + 1;
        });

        const answerLabels = Object.keys(counts);
        const answerValues = Object.values(counts);
        console.log(answerLabels)
        return {
            labels: answerLabels,
            values: answerValues
        };
    }
    
const data = generateChartData(answers)

//TODO: Change colors to something else
const chartData = {
    labels: data.labels,
    datasets: [
        {
            data: data.values,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ]
        }
    ]
};

return (
    <Container className="pie-chart-container d-flex flex-column justify-content-center">
        <Pie className="pie-chart" data={chartData} />
    </Container>
);
};

export default BinaryQuestionStatistics;