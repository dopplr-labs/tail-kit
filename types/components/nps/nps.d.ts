import React from 'react';
/**
 * NPS widget properties
 */
export declare type NPSProps = {
    /** Title message to show above NPS scale */
    title?: string;
    /** Callback function which is triggered when a user selects score */
    onSubmit?: (score: number) => void;
    /** Message to show after score selection by user */
    message?: (score: number) => React.ReactNode;
    /** Additional classes to apply on NPSInput component */
    className?: string;
    /** Additional styles to apply on NPSInput component */
    style?: React.CSSProperties;
};
/**
 * The Net Promoter Score (NPS) methodology is based on asking customers a single question
 * that predicts the likelihood of both repurchase and referral: “How likely is it that you would recommend this company to a friend or colleague?” Customers rate their answers on a scale from 0 to 10.
 *
 * The answers customers provide are classified as follows:
 *
 *  * 0–6 = Detractors—unhappy customers who can hurt your brand through negative word-of-mouth
 *  * 7–8 = Passives—satisfied but indifferent customers who could be swayed by the competition
 *  * 9–10 = Promoters—loyal customers who will keep buying and referring others
 *
 * Finally, NPS score can be easily calculated using a mathematical formula
 * ** ((Promoters - Detractors) / Respondents) * 100 **
 */
export declare function NPSInput({ title, onSubmit, message, className, style, }: NPSProps): JSX.Element;
