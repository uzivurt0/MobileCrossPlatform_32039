import { Redirect, Route } from 'react-router-dom';
import { IonAlert, IonApp, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import {useRef, useState} from "react";
import Home from './pages/Home';
import BmiControls from './components/BmiControls';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControls from './components/InputControls';

const App: React.FC = () => {

  const [error, setError] = useState<string>();
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [resultBMI, setResultBMI] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0){
      setError('Please enter a valid (non-negative) input number');
      return;
    }
    
    const bmi = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));

    

    if(bmi < 18.5 ){
      const result = "Kurus"
      setResultBMI(result);
    } else if (bmi < 24.9) {
      const result = "Normal"
      setResultBMI(result);
    } else if (bmi < 29.9){
      const result = "Gemuk"
      setResultBMI(result);
    } else {
      const result = "Obesitas"
      setResultBMI(result);
    }
    setCalculatedBMI(bmi);
  };

  const resetInput = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  }
  return(
  <>
    <IonAlert 
      isOpen={!!error}
      message={error}
      buttons={[
        {text: 'Okay', 
        handler: setError}
      ]}/>
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControls selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
              <IonItem>
                <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetInput}/>
          {calculatedBMI && (<IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <h2>{calculatedBMI}</h2>
                  <h2>{resultBMI}</h2>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>)}
        </IonGrid>
      </IonContent>
    </IonApp>
  </>
  )
};

export default App;
