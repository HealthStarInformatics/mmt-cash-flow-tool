import React, { useContext, useState } from "react";

import { AppContext } from "../../App";

import StartingBalanceModal from "./StartingBalanceModal";
import StartingBalanceEntryEdit from "./StartingBalanceEntryEdit";

import "../../styles/CurrentMonthViewHeaderVerbage.scss";

const CurrentMonthViewHeaderVerbage = ({ modalvisible, setModalvisible }) => {
  const changeModal = () => {
    setModalvisible(!modalvisible);
  };
  const { monthlyData, selectedMonth, setState } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [startingBal, setStartingBal] = useState(
    monthlyData[selectedMonth.label].startingBalance.total
  );

  return (
    <>
      <div className="wrapper">
        <p className="subtitle">Your starting balance</p>
        <div className="description">
          This is the cash you have available at the start of the month.
          Estimates are ok.{" "}
          <div className="Nav_link underline" onClick={changeModal}>
            Help me calculate
          </div>
        </div>
        {modalvisible && (
          <StartingBalanceModal
            closeModal={changeModal}
            setStartingBal={setStartingBal}
          />
        )}
        <StartingBalanceEntryEdit
          startingBal={startingBal}
          setEditing={setEditing}
          setStartingBal={setStartingBal}
          editing={editing}
          setState={setState}
          month={selectedMonth.label}
          changeModal={changeModal}
          startingBalanceTotal={
            monthlyData[selectedMonth.label].startingBalance.total
          }
        />
      </div>
    </>
  );
};

export default CurrentMonthViewHeaderVerbage;
