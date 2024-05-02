import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Circle, Line, Rect, Svg } from 'react-native-svg';
import { RevisionCardiaca } from '../../interfaces/interfaces';

interface Props{
    SignalData?: RevisionCardiaca,
    Errorx: number,
    Errory: number
}

export const ECG = ({ SignalData, Errorx=0, Errory=0 }: Props) => {
    if (SignalData != undefined){
        const GraphWidth = 230;
        const GraphHeight = 260;
        const BackgroundColor = 'white';
        const GridLineColor = 'black';
        const GridSize = 25;

        //Funcion para generar la lineas horizontales y vericales de la grafica
        const FunGenerateGridLines = () => {
            const linesy = [];
            const linesx = [];

            // Lineas Horizontales
            for (let y = GridSize; y < GraphWidth; y += GridSize) {
                linesy.push(
                    <Line key={`h${y}`} x1={0} y1={y} x2={260} y2={y} stroke={GridLineColor} strokeWidth={1} strokeOpacity={0.5} />
                );
            }
            // Lineas Verticales
            for (let x = GridSize; x < GraphHeight; x += (GridSize*2)) {
                linesx.push(
                    <Line key={`h${x}`} x1={x} y1={0} x2={x} y2={230} stroke={GridLineColor} strokeWidth={1} strokeOpacity={0.5} />
                );
            }

            return [linesy, linesx];
        };

        return (
            <View style={{ borderWidth:1 }}>
                <Svg width={260} height={225}>
                    {/* Fondo de la Gráfica */}
                    <Rect x='0' y='0' width={260} height={225} fill={BackgroundColor} />

                    {/* Lineas de la cuadricula */}
                    {FunGenerateGridLines()}

                    {/* Lineas para conectar los punto del ECG */}
                    <Line
                        x1={SignalData.PrimerPuntoX + Errorx} y1={SignalData.PrimerPuntoY - Errory}
                        x2={SignalData.PSignalX + Errorx} y2={SignalData.PSignalY - Errory}
                        stroke={"#FB3D61"} strokeWidth={4}
                    />
                    <Line
                        x1={SignalData.PSignalX + Errorx} y1={SignalData.PSignalY - Errory}
                        x2={SignalData.QSignalX + Errorx} y2={SignalData.QSignalY - Errory}
                        stroke={"#FB3D61"} strokeWidth={4}
                    />
                    <Line
                        x1={SignalData.QSignalX + Errorx} y1={SignalData.QSignalY - Errory}
                        x2={SignalData.PuntoMasAltoX + Errorx} y2={SignalData.PuntoMasAltoY - Errory}
                        stroke={"#FB3D61"} strokeWidth={4}
                    />
                    <Line
                        x1={SignalData.PuntoMasAltoX + Errorx} y1={SignalData.PuntoMasAltoY - Errory}
                        x2={SignalData.SSignalX + Errorx} y2={SignalData.SSignalY - Errory}
                        stroke={"#FB3D61"} strokeWidth={4}
                    />
                    <Line
                        x1={SignalData.SSignalX + Errorx} y1={SignalData.SSignalY - Errory}
                        x2={SignalData.TSignalX + Errorx} y2={SignalData.TSignalY - Errory}
                        stroke={"#FB3D61"} strokeWidth={4}
                    />

                    <Line
                        x1={SignalData.TSignalX + Errorx} y1={SignalData.TSignalY - Errory}
                        x2={SignalData.PuntoFinalX + Errorx} y2={SignalData.PuntoFinalY - Errory}
                        stroke={"#FB3D61"} strokeWidth={4}
                    />

                    {/* Cramos los puntos de referencia dentro de la grafica */}
                    <Circle cx={SignalData.PrimerPuntoX + Errorx} cy={SignalData.PrimerPuntoY - Errory} r="4" fill="#71C4EF" />
                    <Circle cx={SignalData.PSignalX + Errorx} cy={SignalData.PSignalY - Errory} r="4" fill="#A8518A" />
                    <Circle cx={SignalData.QSignalX + Errorx} cy={SignalData.QSignalY - Errory} r="4" fill="#941C20" />
                    <Circle cx={SignalData.PuntoMasAltoX + Errorx} cy={SignalData.PuntoMasAltoY - Errory} r="4" fill="#000000" />
                    <Circle cx={SignalData.SSignalX + Errorx} cy={SignalData.SSignalY - Errory} r="4" fill="#61BC84" />
                    <Circle cx={SignalData.TSignalX + Errorx} cy={SignalData.TSignalY - Errory} r="4" fill="#DDB900" />
                    <Circle cx={SignalData.PuntoFinalX + Errorx} cy={SignalData.PuntoFinalY - Errory} r="4" fill="#0A678D" />
                </Svg>
            </View>
        );
    }
};
