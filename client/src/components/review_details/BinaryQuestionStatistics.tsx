import React, { useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Container } from "react-bootstrap";
import '../stylesheets/review_details/BinaryQuestionStatistics.css'
Chart.register(ArcElement, Tooltip, Legend);


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
    
        let answerLabels = Object.keys(counts);
        let answerValues = Object.values(counts);
    
        // Sort labels so that "Yes" is always before "No"
        answerLabels.sort((a, b) => {
            if (a.toLowerCase() === "yes") return -1;
            if (b.toLowerCase() === "yes") return 1;
            if (a.toLowerCase() === "no") return 1;
            if (b.toLowerCase() === "no") return -1;
            return 0;
        });
    
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
                backgroundColor: data.labels.map(label => label.toLowerCase() === 'yes' ? 'blue' : 'red')

            }
        ]
    };

    return (
        <Container className="pie-chart-container d-flex flex-column justify-content-center">
            <p className="mb-0">svar: {answers.length}</p>
            <Pie className="pie-chart" data={chartData} />
        </Container>
    );
};

export default BinaryQuestionStatistics;