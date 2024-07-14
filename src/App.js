import React, { useState, useEffect } from 'react';
import axios from 'axios';
import subjectgroup from './course.txt';
import one from './1.txt';
import two from './2.txt';
import three from  './3.txt';
import four from './4.txt';
import five from './5.txt';
import Comment from './addandcomment.js'; // Import the Comment component
import styled from 'styled-components';
import Toggle from "react-toggle";
import "react-toggle/style.css";

const DarkModeToggle = ({ isDark, setIsDark }) => (
  <Toggle
    checked={isDark}
    onChange={() => setIsDark(!isDark)}
    icons={{ checked: "🌙", unchecked: "🔆" }}
    aria-label="Dark mode toggle"
  />
);


const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ darkMode }) => darkMode ? '#1f2023' : '#fafafa'};
  color: ${({ darkMode }) => darkMode ? '#efefef' : '#1f2023'};
`;

const ButtomRight = styled.div`
  align-items: left;
  justify-content: left;
  display: left;
  background-color: ${({ darkMode }) => darkMode ? '#1f2023' : '#fafafa'};
  color: ${({ darkMode }) => darkMode ? '#efefef' : '#1f2023'};
`;


const StyledH1 = styled.h1`
  font-size: 30px;
  text-align: center;
  margin-bottom: -3px;
  margin-top: -10px;
  font-family: 'Roboto', sans-serif;
`;

const StyledH2 = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  font-family: "Times New Roman", Times, serif;
`;

const StyledH3 = styled.h3`
  font-size: 16px;
  text-align: center;
  margin-bottom: -10px;
  margin-top: 5px;
  margin-right: 560px;
  color: gray;
  text-decoration: underline;
`;


const StyledImage = styled.img`
  width: 150px; /* ปรับขนาดของรูปภาพเป็น 150px */
  margin-top: 20px; /* ขยับรูปภาพขึ้นจากขอบด้านบน */
  margin-bottom: 20px; /* ขยับรูปภาพลงจากขอบด้านล่าง */
  object-fit: contain; /* จัดการขนาดรูปภาพให้พอดีกับพื้นที่ของตัวเองโดยไม่เปลี่ยนรูปร่าง */
`;

const StyledSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px; /* ปรับระยะห่างระหว่าง Dropdown กับส่วนอื่น ๆ ของเนื้อหา */
`;

const StyledSelect = styled.select`
  width: 500px; /* ปรับความยาวของ dropdown */
  font-size: 16px; /* ปรับขนาดตัวอักษรใน dropdown */
  padding: 8px; /* ปรับระยะห่างรอบขอบของ dropdown */
  border-radius: 15px; /* กำหนดความโค้งของ dropdown */
`;

const StyledSeparator = styled.div`
  width: 100%;
  max-width: 800px;
  height: 3px;
  border-top: 3px solid #000;
  margin: 10px; 
`;

const HomePage = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [idd, setId] = useState("");
  const [subject, setsubject] = useState(1);
  const [selectedGroupSubject, setSelectedGroupSubject] = useState("");
  const [groupSubjects, setGroupSubjects] = useState([]);
  const [checkstart,setcheckstart]=useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetchGroupSubjects();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [selectedGroupSubject]);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    findIdWhenSelect(selectedCourse);
  }, [selectedCourse]);



  const fetchCourses = async () => {  
    if(subject==1){
      const response = await axios.get(one);
      const courseList = response.data.split('\n').filter(course => course.trim() !== '');
      setCourses(courseList);
    } if(subject==2){
      const response = await axios.get(two);
      const courseList = response.data.split('\n').filter(course => course.trim() !== '');
      setCourses(courseList);
    } if(subject==3){
      const response = await axios.get(three);
      const courseList = response.data.split('\n').filter(course => course.trim() !== '');
      setCourses(courseList);
    } if(subject==4){
      const response = await axios.get(four);
      const courseList = response.data.split('\n').filter(course => course.trim() !== '');
      setCourses(courseList);
    } if(subject==5){
      const response = await axios.get(five);
      const courseList = response.data.split('\n').filter(course => course.trim() !== '');
      setCourses(courseList);
    } 
  };

  const fetchGroupSubjects = async () => {
    try {
      const response = await axios.get(subjectgroup);
      const groupSubjectsData = response.data.split('\n').filter(course => course.trim() !== '');
      setGroupSubjects(groupSubjectsData);
    } catch (error) {
      console.error('Error fetching group subjects:', error);
    }
  };

  const handleCourseSelect = (event) => {
    setSelectedCourse(event.target.value);
  };

  
  
  const handleGroupSubjectSelect = (event) => {
    setcheckstart(true);
    setSelectedGroupSubject(event.target.value);
    findIdWhenSelectgroupsubject(event.target.value);
  };
  

  const findIdWhenSelect = (selectedCourse) => {
    const courseId = selectedCourse.split(' ')[0]; // Get the course ID from the selected course string
    setId(courseId);
    fetchCourses();
  };

  const findIdWhenSelectgroupsubject = (selectedGroupSubject) => {
    const courseId = selectedGroupSubject.split(' ')[0]; // Get the course ID from the selected course string
    setsubject(courseId);
    fetchCourses();
  };

  return (
    <>
        <ButtomRight darkMode={isDark}>
        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
      </ButtomRight>
      <StyledContainer darkMode={isDark}>
        
        <StyledImage src={require('./assets/logo.png')} alt="Logo" />
        <StyledH1>KU CLAP SRC</StyledH1>
        <StyledH2>เลือกหมวดหมู่วิชาเสรี</StyledH2>
        <StyledSelect onChange={handleGroupSubjectSelect} value={selectedGroupSubject}>
          <option value="">-- Please Select --</option>
          {groupSubjects.map((groupSubject, index) => (
            <option key={index} value={groupSubject.trim()}>
              {groupSubject.trim()}
            </option>
          ))}
        </StyledSelect>
      </StyledContainer>
      {!checkstart ? (<StyledContainer darkMode={isDark}>
        <StyledContainer darkMode={isDark}>
          <div style={{ minHeight: '100vh' }}></div>
        </StyledContainer>
      </StyledContainer>) : (
      <StyledContainer darkMode={isDark}>
        <StyledH2>เลือกรายวิชา</StyledH2>
        <StyledSelectContainer>
          <StyledSelect onChange={handleCourseSelect} value={selectedCourse}>
            <option value="">-- Please Select --</option>
            {courses.map((course, index) => (
              <option key={index} value={course.trim()}>
                {course.trim()}
              </option>
            ))}
          </StyledSelect>
        </StyledSelectContainer>
        <StyledSeparator /> 
        {selectedCourse && <StyledH2>รายละเอียด {selectedCourse}</StyledH2>}
        <Comment id_course={idd} Darkmode={isDark}/>
      </StyledContainer>
    )}
  </>
  );
};

export default HomePage;

  
