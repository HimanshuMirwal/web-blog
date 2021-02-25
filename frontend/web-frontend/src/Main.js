import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Logo from "./modules/logoSection/Logo";
import TittleList from "./modules/TittleSection/TittleList";
import Content from "./modules/ContentSection/Content";
import Feedback from "./modules/FeedbackSection/Feedback";
import Footer from "./modules/FooterSection/Footer";
function App(props) {
  const [TitleValue, setTitleValue]=useState("tour");
  const [SubTitleValue, setSubTitleValue]=useState("Rajasthan");
  function GetTitleValue(value, SubValue){
    setTitleValue(value);
    setSubTitleValue(SubValue);
  }
  function GetSubTitleValue(value){
    setSubTitleValue(value);
    // console.log(value);
  }
  return (
    <div className="">
      <Logo/>
      <TittleList TitleValueFunction={GetTitleValue} key={GetTitleValue+"018909820"}/>
      <Content SendTitleValueFunction={TitleValue} GetSubTitleValue={GetSubTitleValue} SendSubTitleValue={SubTitleValue} key={SubTitleValue+"janskjnksajnkjn"} />
      <Feedback key={TitleValue+"lkanlknslk9009"} />
      <Footer />
    </div>
  );
}

export default App;
