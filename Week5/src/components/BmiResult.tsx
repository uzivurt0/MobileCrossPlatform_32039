import React from "react";
import { IonCard, IonCardContent } from "@ionic/react";

  
const BmiResults: React.FC<{calculatedBmi: number;categoryResultBmi: string | undefined;}> = (props) => {
return (
    <IonCard>
        <IonCardContent className="ion-text-center">
          <h2>{props.calculatedBmi}</h2>
          <h1>{props.categoryResultBmi}</h1>
        </IonCardContent>
      </IonCard>
    );
};
  
export default BmiResults;