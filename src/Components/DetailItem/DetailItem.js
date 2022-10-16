import React from "react";
import { Container } from "Styles/globalStyle";
import {
  CreateContainer,
  DateWeaterArea,
  Title,
  Img,
  Content,
  Delete,
  DeleteBtn,
} from "../DetailItem/itemStyle";
import { doc, deleteDoc } from "firebase/firestore";
import { dbService } from "../../firebase";
import { useNavigate } from "react-router-dom";

function DetailItem({ title, date, weather, url, content, type, id }) {
  // console.log(typeof date.toString());
  const navigate = useNavigate();
  const deleteList = async (id) => {
    const listDoc = doc(dbService, "서희", id);
    await deleteDoc(listDoc);
    console.log(id);
  };

  return (
    <Container>
      <CreateContainer>
        <form className="form__create">
          <Title>{title}</Title>
          <DateWeaterArea>
            {/* <span>
              {date.toString() === !undefined &&
                date.toString().toDate().toLocaleString().slice(0, 11)}
            </span> */}
            <span>{weather}</span>
          </DateWeaterArea>
          {url && <Img src={url} />}
          <Content isImg={url}>{content}</Content>

          {type === "create" ? null : (
            <Delete>
              {/* <img src="/trash.png" alt="삭제하기" /> */}
              <DeleteBtn
                onClick={() => {
                  deleteList(id);
                  navigate("/find");
                }}
              >
                삭제하기
              </DeleteBtn>
            </Delete>
          )}
        </form>
      </CreateContainer>
    </Container>
  );
}

export default DetailItem;
