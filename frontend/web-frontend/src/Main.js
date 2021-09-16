import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Logo from "./modules/logoSection/Logo";
import TittleList from "./modules/TittleSection/TittleList";
import Content from "./modules/ContentSection/Content";
import Feedback from "./modules/FeedbackSection/Feedback";
import Footer from "./modules/FooterSection/Footer";
import axios from 'axios';
import { useParams } from 'react-router';
function App(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [SubTitleValue, setSubTitleValue] = useState("");
  // const [SubtittleFirstContent,SetSubtittleFirstContent]=useState("")
  const {tittle, subtittle} = useParams();
  useEffect(() => {
    axios.get("http://localhost:8000/tittle/gettitle")
      .then(data => {
        const NewData = tittle ? tittle : data.data[0].TittleName;
        setTitleValue(NewData)
        // console.log(props)
        axios.get("http://localhost:8000/subtittle/getsubtitle")
          .then(dataSub => {
              const TempSubTitle = dataSub.data.filter(val => { if (val.TittleName === NewData) { return val.subtittleName } })
               const tempdata=subtittle?subtittle: TempSubTitle[0].subtittleName
               setSubTitleValue(tempdata);
            }
          )
      })
      .catch(err => console.log(err))
      // if(subtittle){
      //   setSubTitleValue(subtittle)
      // }else{
      //   setSubTitleValue(SubtittleFirstContent)
      // }
  }, [props.match.params.tittle,props.match.params.subtittle, TitleValue,subtittle])

  return (
    <div>
      <Logo />
      <TittleList />
      <Content SendTitleValueFunction={TitleValue}  SendSubTitleValue={SubTitleValue} key={SubTitleValue + "janskjnksajnkjn"} />
      <Feedback key={TitleValue + "lkanlknslk9009"} />
      <Footer />
    </div>
  );
}

export default App;
