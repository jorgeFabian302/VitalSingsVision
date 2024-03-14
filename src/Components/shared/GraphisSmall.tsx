import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Circle, Line, Rect, Svg } from 'react-native-svg';


const ECG = (SignalData: any) => {
    const GraphWidth = SignalData.PuntoFinalX + 10;
    const GraphHeight = 300;
    const BackgroundColor = 'white';
    const GridLineColor = 'red';
    const GridSize = 20;

    //Funcion para generar la lineas horizontales y vericales de la grafica
    const FunGenerateGridLines = () => {
        const lines = [];

        // Lineas Horizontales
        for (let y = GridSize; y < GraphHeight; y += GridSize) {
            lines.push(
                <Line key={`h${y}`} x1={0} y1={y} x2={GraphWidth} y2={y} stroke={GridLineColor} strokeWidth={1} strokeOpacity={0.5} />
            );
        }
        // Lineas Verticales
        for (let x = GridSize; x < GraphHeight; x += GridSize) {
            lines.push(
                <Line key={`h${x}`} x1={x} y1={0} x2={x} y2={GraphHeight} stroke={GridLineColor} strokeWidth={1} strokeOpacity={0.5} />
            );
        }

        return lines;
    };

    return (
        <Svg width={GraphWidth} height={GraphHeight}>
            {/* Fondo de la Gráfica */}
            <Rect x='0' y='0' width={GraphWidth} height={GraphHeight} fill={BackgroundColor} />

            {/* Lineas de la cuadricula */}
            {FunGenerateGridLines()}

            {/* Lineas para conectar los punto del ECG */}
            <Line
                x1={SignalData.PrimerPuntoX} y1={SignalData.PrimerPuntoY}
                x2={SignalData.PSignalX} y2={SignalData.PSignalY}
                stroke={'black'} strokeWidth={2}
            />
            <Line
                x1={SignalData.PSignalX} y1={SignalData.PSignalY}
                x2={SignalData.QSignalX} y2={SignalData.QSignalY}
                stroke={'black'} strokeWidth={2}
            />
            <Line
                x1={SignalData.QSignalX} y1={SignalData.QSignalY}
                x2={SignalData.PuntoMasAltoX} y2={SignalData.PuntoMasAltoY}
                stroke={'black'} strokeWidth={2}
            />
            <Line
                x1={SignalData.PuntoMasAltoX} y1={SignalData.PuntoMasAltoY}
                x2={SignalData.SSginalX} y2={SignalData.SSignalY}
                stroke={'black'} strokeWidth={2}
            />
            <Line
                x1={SignalData.SSginalX} y1={SignalData.SSignalY}
                x2={SignalData.TSginalX} y2={SignalData.TSignalY}
                stroke={'black'} strokeWidth={2}
            />

            {/* Cramos los puntos de referencia dentro de la grafica */}
            <Circle cx={SignalData.PrimerPuntoX} cy={SignalData.PrimerPuntoY} r="4" fill="red" />
            <Circle cx={SignalData.PuntoMasAltoX} cy={SignalData.PuntoMasAltoY} r="4" fill="red" />
            <Circle cx={SignalData.PuntoFinalX} cy={SignalData.PuntoFinalY} r="4" fill="red" />
            <Circle cx={SignalData.QSignalX} cy={SignalData.QSignalY} r="4" fill="red" />
            <Circle cx={SignalData.SSignalX} cy={SignalData.SSignalY} r="4" fill="red" />
            <Circle cx={SignalData.TSignalX} cy={SignalData.TSignalY} r="4" fill="red" />
            <Circle cx={SignalData.PSignalX} cy={SignalData.PSignalY} r="4" fill="red" />
        </Svg>
    );
};



export const GraphisSmall = (route: any) => {
    const IDUser = route.params?.IdPaciente;
    const [SignalData, setSignalData] = useState();


    useEffect(() => {
      const fetchDataWithId = async (id: string) =>{
        try{
            
        } catch (error) {

        }
      }
    })
    


    return (
        <View>

        </View>
    )
}
