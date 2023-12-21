import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ClassApi from '../../Api/Api'
import AutoComplete from "../../Layout/component/AutoCompleteSearch";
import { toast } from "react-toastify";
import CustomRow from "./Row";
import { NavLink } from "react-router-dom";
const headers = [
  "Họ và tên",
  "Ngày, tháng, năm sinh",
  "Số CMT/CCCD",
  "Quan hệ với chủ hộ",
  " ",
];
function ThemHoDan() {
  const [ownerName, setOwnerName] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState()
  const [listMember, setListMember] = useState([])
  const [numberLine, setNumberLine] = useState(0);
  const [id, setId] = useState('')
  const [arr, setArr] = useState([1])
  const [personList, setPersonList] = useState([])
  const [identityCardNumber, setIdentityCardNumber] = useState('')
  const [birth, setBirth] = useState('')
  const personShrinkList = [];
  useEffect(() => {
    ClassApi.GetAllPeople()
      .then((res) => {
        setPersonList(res.data);
      })
      .catch((err) => {
        toast.error("lỗi 1");
      });
  }, [name]);
  personList.map((person, index) => {
    personShrinkList.push({
      label: person.name,
      code: person.identityCardNumber,
      personId: person.personId,
      residenceId: person.residenceId,
      birth: person.dateOfBirth.slice(0, 10),
      address: person.homeTown,
      person: person
    });
  });
  const handlePost = () => {
    ClassApi.PostResidence({
      "residenceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "memberNumber": listMember.length,
      "address": address,
      "ownerId": id,
      "people": listMember
    }).then((response) => {
      toast.info('Thành công')
    })
  }
  var deleterow = (index) => {
    const newArr = arr.filter((_, idx) => idx !== index - 1);
    setArr(newArr)
    const updatedList = listMember.filter((_, i) => i !== index);
    setListMember(updatedList);

    //  setNumberLine(numberLine - 1)
  }
  const handleAddRow = () => {
    setArr([...arr, arr.length + 1]); // Thêm một phần tử mới vào mảng arr với giá trị tăng dần
  };
  useEffect(() => {
    setArr(Array.from({ length: numberLine }, (_, index) => index + 1)); // Tạo mảng mới từ 1 đến numberLine
  }, [numberLine]);
  const pushMember = (person) => {
    setListMember([...listMember, person])
    console.log([...listMember, person])
  }
  const handleChangeName = (event, value) => {
    let newArray = listMember;
    if (newArray.length > 0) {
      newArray.splice(0, 1, value.person)
      setListMember(newArray)
      console.log(newArray)
    }
    pushMember(value.person)
    setName(value.label)
    setId(value.personId)
    setAddress(value.address)
    setIdentityCardNumber(value.code)
    setBirth(value.birth)
    console.log(value)
  };
  return (
    <Grid container spacing={2} padding="50px">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <h1 style={{ fontSize: "40px" }}>Thêm hộ dân mới</h1>
        </Grid>
        <Grid
          item
          container
          xs={12}
          direction="row"
          style={{ alignItems: "center", alignContent: 'center  ' }}
        >
          <Grid item xs={5} sm={2.2}>
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Tên chủ hộ
            </Typography>
          </Grid>
          <Grid item >
            <AutoComplete
              optionList={personShrinkList}
              onChange={handleChangeName}
              width={400}
            ></AutoComplete>

          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          direction="row"
          style={{ alignItems: "center" }}
        >
          <Grid item xs={5} sm={2.2}>
            <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
              Nơi thường trú
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: "30px", marginBottom: "30px" }}>
            <TextField
              style={{ width: "500px" }}
              inputProps={{ style: { fontSize: "15px" } }}
              value={address}
              onChange={(e) => { setAddress(e.target.value) }}
              disabled
            ></TextField>
          </Grid>
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: "24px", marginRight: "25px" }}>
            Danh sách nhân khẩu
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {headers.map((column, index) => (
                  <TableCell key={index}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      {column}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography style={{ fontSize: '20px' }}>{name}</Typography>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <input
                    style={{ fontSize: "18px", border: "none" }}
                    type="date"
                    value={birth}
                    //     onChange={(e) => { setBirth(e.target.value) }}
                    disabled
                  />
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <input
                    style={{
                      fontSize: "18px",
                      border: "none",
                      width: "150px",
                    }}
                    type="text"
                    value={identityCardNumber}
                    disabled
                  //   onChange={(e)=>setIdentityCardNumber(e.target.value)}
                  ></input>
                </TableCell>
                <TableCell style={{ fontSize: "18px" }}>
                  <Select style={{ fontSize: "18px", border: "none", width: '120px' }} value='Chủ hộ' >

                    <MenuItem value='Chủ hộ'>Chủ hộ</MenuItem>

                  </Select>
                </TableCell>
                <TableCell style={{ fontSize: "18px", cursor: "pointer" }}>
                  <NavLink to={'/chitietcudan/' + id}>
                    <span style={{ color: "blue" }}>Chi tiết</span>|
                  </NavLink>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      fontSize: "18px",
                    }}

                  >

                  </button>
                </TableCell>
              </TableRow>
              {arr.map((index) => (
                <CustomRow key={index} index={index} ondelete={deleterow} handleAdd={pushMember} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <button
          style={{ backgroundColor: "transparent", cursor: "pointer" }}
          onClick={() => {
            handleAddRow()
          }}
        >
          <Typography variant="h4" style={{ color: "red", cursor: "pointer" }}>
            Thêm
          </Typography>
        </button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          style={{ backgroundColor: "#79C9FF", margin: "30px 0px" }}
          onClick={handlePost}
        >
          <Typography variant="h4" style={{ color: "black" }}>
            Xác nhận
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default ThemHoDan;
