import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Accordion, Carousel, Navbar} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {identifiers} from '../brute_force';
import {fetchData} from '../redux/actions';
import CarousellesImage from './CarousellesImage';

const LinkedinSearch = () => {
  const {data, loading} = useSelector((state) => state);

  const dispatch = useDispatch();
  const [ids, setIds] = useState(identifiers);
  const [text, setText] = useState('');
  const [profile_id, setProfile_id] = useState();

  const [charging, setCharging] = useState('');
  // console.log(data.certifications.length);

  const person = ids.find((el) => el.name.toLowerCase().includes(text));
  // console.log(person);

  var options = {
    method: 'POST',
    url: 'https://linkedin-profiles-and-company-data.p.rapidapi.com/profile-details',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'linkedin-profiles-and-company-data.p.rapidapi.com',
      'x-rapidapi-key': 'd4d5e91e66msh33c6a706e54d473p10d26ejsn1eb1476d911a',
    },
    data: {
      profile_id: `${profile_id}`,
      profile_type: 'personal',
      contact_info: false,
      recommendations: false,
      related_profiles: false,
    },
  };

  //   axios.request(options).then(function (response) {
  //       console.log(response.data);
  //   }).catch(function (error) {
  //       console.error(error);
  //   });

  useEffect(() => {
    if (person) {
      setProfile_id(person.id);
    } else {
      alert('user does not exist');
    }
  }, [text]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await setCharging('loading...');
    dispatch(fetchData(options));
  };

  // for test purposes only
  // this works btw
  // useEffect(() => {
  //    handleSubmit()
  // }, [])
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home" className="logo">
          <img
            src="https://cdn.discordapp.com/attachments/916337600875335680/930474795336859698/LPS.png"
            alt="Logo"
            style={{width: '150px'}}
          />
        </Navbar.Brand>
        <form
          onSubmit={handleSubmit}
          className="formulaire"
          style={{
            width: '200%',
            display: 'flex',
            justifyContent: 'end',
            height: '40px',
          }}
        >
          <input
            className="search-bar"
            style={{width: '500px'}}
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Please provide a linkedin user id ex: 'allegui-emna-34b24b104' "
          />
        </form>
      </Navbar>

      <div>
        {loading ? (
          <h2> {charging} </h2>
        ) : (
          <div>
            <h3 className="introduction">
              Hello and welcome to {data.first_name} {data.last_name}'s profile{' '}
            </h3>
            <div className="container">
              <img className="prof-pic" src={data.profile_picture} alt="" />
              <div className="summ">
                <h3>Summary:</h3>
                <p>{data.summary}</p>
              </div>
            </div>
            <div className="container-acc">
              <Accordion defaultActiveKey="0" className="acc">
                {!data.skills.length == 0 && (
                  <Accordion.Item className="act-btn" eventKey="0">
                    <Accordion.Header className="elt-btn">
                      {' '}
                      <h4>Skills</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {data.skills.map((el) => (
                          <li style={{listStyle: 'none'}}>{el}</li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
                {!data.certifications.length == 0 && (
                  <Accordion.Item eventKey="1">
                    <Accordion.Header className="elt-btn">
                      <h4>Licenses & certifications</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <>
                        {!data.certifications.length == 0 ? (
                          <>
                            {data.certifications.map((el) => (
                              <CarousellesImage certif={el} key={el.id} />
                            ))}
                          </>
                        ) : null}
                      </>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
                {!data.education.length == 0 && (
                  <Accordion.Item className="act-btn" eventKey="2">
                    <Accordion.Header className="elt-btn">
                      {' '}
                      <h4>Education</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {data.education.map((el) => (
                          <li style={{listStyle: 'none'}}>
                            {el.degree_name} {el.field_of_study}
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
              </Accordion>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedinSearch;
