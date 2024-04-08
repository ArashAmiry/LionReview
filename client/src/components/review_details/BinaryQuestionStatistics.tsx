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
        const counts: { [key: string]: number } = {}; // Initialize "Don't know" with a count of 0

        arr.forEach(label => {
            counts[label] = (counts[label] || 0) + 1;
        });

        let answerLabels = Object.keys(counts);
        let answerValues = Object.values(counts);

        let labeledCounts = answerLabels.map((label, index) => ({ label, count: answerValues[index] }));

        labeledCounts.sort((a, b) => {
            const order = ["yes", "no", "don't know"]; // Define your preferred order
            const indexA = order.indexOf(a.label.toLowerCase());
            const indexB = order.indexOf(b.label.toLowerCase());
            return indexA - indexB;
        });

        answerValues = labeledCounts.map(({ count }) => count);
        answerLabels = labeledCounts.map(({ label }) => label);

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
                backgroundColor: data.labels.map(label => {
                    if (label.toLowerCase() === 'yes') return 'blue';
                    if (label.toLowerCase() === "no") return 'red';
                    return 'gray';
                })

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