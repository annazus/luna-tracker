import React from "react";
import SymptomDetail from "../SymptomDetail";
import classes from "./SymptomDetails.module.css";
const SymptomDetails = ({
  symptomId,
  symptomDetails,
  isExclusive,
  userSymptomDetails = [],
  addSymptomDetail,
  removeSymptomDetail
}) => {
  console.log("userSymptomDetails", userSymptomDetails);

  const symptomsContent = (details, userDetails) => {
    console.log("symptomsContent", userDetails);
    return details.map(detail => {
      console.log(detail.id);
      const userDetailRecords = userDetails.filter(usd => {
        console.log("symptomsContent2", usd.symptomDetail.id, detail.id);
        return usd.symptomDetail.id === detail.id;
      });
      const selected = userDetailRecords.length > 0;
      console.log("usd", userDetailRecords[0]);
      return (
        <SymptomDetail
          selected={selected}
          label={detail.name}
          key={detail.id}
          className={classes.SymptomTrait}
          clickHandler={() => {
            if (selected) removeSymptomDetail(userDetailRecords[0].id);
            else addSymptomDetail(detail.id);
          }}
        />
      );
    });
  };

  return (
    <div className={classes.SymptomTraits}>
      {symptomsContent(symptomDetails, userSymptomDetails)}
    </div>
  );
};
export default SymptomDetails;
