import React from 'react';

import { IonButton, IonCol, IonIcon, IonRow, IonGrid } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";

const BmrControls: React.FC<{onCalculate: () => void;onReset: () => void}> = props => {
    return (
      <IonGrid class="ion-text-center ion-margin">
        <IonRow>
          <IonCol className="ion-text-left">
            <IonButton onClick={props.onCalculate}>
              <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
              Calculate
            </IonButton>
          </IonCol>
          <IonCol className="ion-text-right">
            <IonButton onClick={props.onReset}>
              <IonIcon slot="start" icon={refreshOutline}></IonIcon>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  };
  
export default BmrControls;