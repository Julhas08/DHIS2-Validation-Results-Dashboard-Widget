import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
//import UsersInfoModal from './UsersInfoModal';
// Diaglo box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Loader
//import Fade from '@material-ui/core/Fade';
//import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
// Delete 
//import DeleteForeverIcon from '@material-ui/icons/Delete';
//import EditOutlined from '@material-ui/icons/EditOutlined';

// Tabs
//import Tabs from '@material-ui/core/Tabs';
//import Tab from '@material-ui/core/Tab';
//import PhoneIcon from '@material-ui/icons/Phone';
//import MessageOutlined from '@material-ui/icons/MessageOutlined';
//import PersonPinIcon from '@material-ui/icons/PersonPin';

import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// Cards
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

// Icons 
import Assignee from '@material-ui/icons/ViewListSharp';

// Thumbs 
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
// Radio 

import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ValidationResultsCard from './ValidationResultsCard';


const baseURL = "../../../";
const fetchOptions = {
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
           
			  }
			};
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};		
class GetValidationResults extends Component{
	constructor(props){
		super(props);
    this.state = {
      searchStatus: 1,
      dateWiseSearch: true, 
      prioritySearch: false, 
      disableDateWise: false,
      disablePriority: false,
      disableLikeDislike: false,
      titleStatus: true,
    };
    // this.generateTable = this.generateTable.bind(this);
 
	}  

  handleChangeDatewise= name => event => {
    let status = false;
    if(event.target.checked){
      status = true;
    }
    this.setState({ 
      [name]: event.target.checked,
      disablePriority : status, 
      disableLikeDislike : status, 
      searchStatus : 1,
      //titleStatus: false,
    });
  };

  handleChangePriority = name => event => {
    let status = false;
    if(event.target.checked){
      status = true;
    }
    this.setState({ 
      [name]: event.target.checked,
      disableDateWise : status, 
      disableLikeDislike : status, 
      searchStatus : 2,
      //titleStatus: false,
    });

  };
  handleChangeLikeDislike= name => event => {
    let status = false;
    if(event.target.checked){
      status = true;
    }
    this.setState({ 
      [name]: event.target.checked,
      disableDateWise : status, 
      disablePriority : status, 
      searchStatus : 3,
      //titleStatus: false,
    });
  };
  
	render(){
    const { classes } = this.props;
    let searchStatus = this.state.searchStatus;

    //Selected validation group.
      var selectedGroup = "";
      //Results from the validation run.
      var results = [];
      let resultsPriority = [];
      let resultsHigh = [];
      let resultsMedium = [];
      let resultsLow = [];
      //User info.
      var user = {};
      var userSettings = {};
      //Array of all validation rules that have been interacted with.
      var userInteractedActions = [];

      var allDownIdOrgUnits = [];
      var userOrgUnitsName = [];
      var selectedFeedbackType = -1;
      let title = ''; 
      let attributesInfoReturn;
      let sortedRules = [];
      var groupBelongsToDashboard = {'ZC1KKn6KNG3': 'UP1lctvalPn', //Anemia
                               'dNZ7Ieg2cmF': 'xcpl667ccfF', //Attendance
                               'cUJMaSC8Wi1': 'xWtt9c443Lt', //Diabetes
                               'DfkC7KiVGO4': 'XcoDQoYpGLk', //Fetal Growth
                               'LfhAZvAoCIN': 'wAVw1QtktVh' //Hypertension
                              };
      function setSelectedGroup() {
          //TODO: SET ID OF DESIRED VALIDATION GROUP. TEMP SOLUTION UNTIL WE GET ROUTING.
          var id = "UP1lctvalPn";
          
          //Gets the id of current dashboard from URL.
          var splitURL = document.URL.split('/');
          var dashboardId = splitURL[splitURL.length -1];

          //var id = this.state.groupBelongsToDashboard[dashboardId];
          //console.log("splitURL: ",splitURL);
          return id;
      }
      
      //Gets all validation groups and user info.
      function getGroupsAndUserInfo() {
          
          var promise1 = new Promise(function(resolve, reject) {
            fetch(baseURL+"api/validationRuleGroups?paging=false",fetchOptions) 
              .then(r => resolve(r.json()))
              .catch(err => reject(err));
          });
          var promise2 = new Promise(function(resolve, reject) {
            fetch(baseURL+"api/userSettings",fetchOptions) 
              .then(r => resolve(r.json()))
              .catch(err => reject(err));
          });
          /*var promise3 = new Promise(function(resolve, reject) {
            fetch(baseURL+"api/me",fetchOptions) 
              .then(r => resolve(r.json()))
              .catch(err => reject(err));
          });*/
          
          return Promise.all([promise1,promise2]).then(function(data) {

            return data;
          });              
          
      }
      getGroupsAndUserInfo().then(data =>{

            var groups = [];
            var selectedGroupName = "";
            groups = data[0].validationRuleGroups;
            selectedGroup = setSelectedGroup();
            for (var i = 0; i < groups.length; i++) {
                if(groups[i].id === selectedGroup) {
                  selectedGroupName = groups[i].displayName 
                }  
            }
            if(this.state.titleStatus){
              document.getElementById("title").innerHTML += selectedGroupName;
            }
            
            //Get locale
            userSettings = data[1];
            //user = data[2]; // from /api/me
            user = {"lastUpdated":"2019-02-22T10:42:02.898","id":"xE7jOejl9FI","created":"2013-04-18T17:15:08.407","name":"John Traore","birthday":"1971-04-08T00:00:00.000","education":"Master of super using","gender":"gender_male","displayName":"John Traore","jobTitle":"Super user","externalAccess":false,"skype":"john.traore","twitter":"john.traore","surname":"Traore","employer":"DHIS","facebookMessenger":"john.traore","introduction":"I am the super user of DHIS 2","email":"john.traore@mail.com","whatsApp":"+123123123123","languages":"English","telegram":"john.traore","lastCheckedInterpretations":"2019-02-22T10:42:02.898","firstName":"John","nationality":"Sierra Leone","interests":"Football, swimming, singing, dancing","favorite":false,"access":{"read":true,"update":true,"externalize":false,"delete":true,"write":true,"manage":true},"userCredentials":{"code":"admin","lastUpdated":"2018-03-07T09:46:27.763","id":"ZyjSDLHGPv4","created":"2013-04-18T17:15:08.401","name":"John Traore","lastLogin":"2019-02-22T16:01:03.794","displayName":"John Traore","externalAuth":false,"externalAccess":false,"disabled":false,"twoFA":false,"passwordLastUpdated":"2014-12-18T20:56:05.264","invitation":false,"selfRegistered":false,"favorite":false,"username":"admin","userInfo":{"id":"xE7jOejl9FI"},"access":{"read":true,"update":true,"externalize":false,"delete":true,"write":true,"manage":true},"lastUpdatedBy":{"id":"xE7jOejl9FI"},"user":{"id":"xE7jOejl9FI"},"favorites":[],"cogsDimensionConstraints":[],"catDimensionConstraints":[],"translations":[],"userGroupAccesses":[],"attributeValues":[],"userRoles":[{"id":"UYXOT4A7JMI"},{"id":"Ufph3mGRmMo"},{"id":"Euq3XfEIEbx"},{"id":"aNk5AyC7ydy"},{"id":"cUlTcejWree"},{"id":"TMK9CMZ2V98"},{"id":"Ql6Gew7eaX6"},{"id":"Pqoy4DLOdMK"},{"id":"DRdaVRtwmG5"},{"id":"jRWSNIHdKww"},{"id":"txB7vu1w2Pr"},{"id":"xJZBzAHI88H"},{"id":"XS0dNzuZmfH"}],"userAccesses":[]},"favorites":[],"teiSearchOrganisationUnits":[],"translations":[],"organisationUnits":[{"id":"ImspTQPwCqd"}],"dataViewOrganisationUnits":[],"userGroupAccesses":[],"attributeValues":[],"userGroups":[{"id":"Kk12LkEWtXp"},{"id":"M1Qre0247G3"},{"id":"NTC8GjJ7p8P"},{"id":"B6JNeAQ6akX"},{"id":"wl5cDMuUhmF"},{"id":"QYrzIjSfI8z"},{"id":"lFHP5lLkzVr"},{"id":"jvrEwEJ2yZn"},{"id":"w900PX10L7O"},{"id":"vAvEltyXGbD"},{"id":"GogLpGmkL0g"},{"id":"vRoAruMnNpB"},{"id":"z1gNAf2zUxZ"},{"id":"gXpmQO6eEOo"},{"id":"tH0GcNZZ1vW"},{"id":"H9XnHoWRKCg"}],"userAccesses":[]};
            
            getOrgUnits().then(response=>{
              var allOrgUnits = [];
              var userOrgunits = [];
              
              allOrgUnits = response[0].organisationUnits;
              for(var i = 0; i < user.organisationUnits.length; i++) {
                  userOrgunits.push(user.organisationUnits[i].id);
              }

              for(var i = 0; i < allOrgUnits.length; i++) {
                  if(userOrgunits.indexOf(allOrgUnits[i].id) > -1){
                      getAllRelated(allOrgUnits[i]);                               
                  }  
              }
              function getAllRelated(ou) {
                for(var i = 0; i < allOrgUnits.length; i++) {
                    if(allOrgUnits[i].id === ou.id){
                        if(allDownIdOrgUnits.indexOf(allOrgUnits[i].id) < 0) {
                            allDownIdOrgUnits.push(allOrgUnits[i].id);
                            userOrgUnitsName[allOrgUnits[i].id] = allOrgUnits[i].name;
                        }                      
                        if(!allOrgUnits[i].children) {
                            return;
                        } else {
                            for(var j = 0; j < allOrgUnits[i].children.length; j++) {
                                getAllRelated(allOrgUnits[i].children[j]);
                            }   
                        }                         
                    }
                }
              
              }           
            
              runValidation().then( info => {
                // Hard coded  due to api is not responsing // info will data
                  let data = {"validationResults":[{"created":"2018-10-20T08:26:46.999","id":59602381,"organisationUnit":{"id":"ah9HtG9h0lg"},"validationRule":{"name":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)>= Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","id":"afe9EJLtmhp","displayName":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)>= Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","instruction":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)== Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","importance":"MEDIUM","description":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)== Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","validationRuleGroups":[]}},{"created":"2018-08-10T02:12:34.765","id":59602384,"organisationUnit":{"id":"gYZmuEDZ7pS"},"validationRule":{"name":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","id":"zyMfj4Fn7PV","displayName":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","instruction":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","importance":"HIGH","description":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","validationRuleGroups":[]}},{"created":"2018-07-12T06:58:26.495","id":59602385,"organisationUnit":{"id":"gYZmuEDZ7pS"},"validationRule":{"name":"Total Anemia (0 - 5 years) >=Referred Anemia (0 - 5 years)","id":"bOTqWuIdG8F","displayName":"Total Anemia (0 - 5 years) >=Referred Anemia (0 - 5 years)","instruction":"Total Anemia (0 - 5 years) >=Referred Anemia (0 - 5 years)","importance":"LOW","description":"Total Anemia (0 - 5 years) >=Referred Anemia (0 - 5 years)","validationRuleGroups":[]}},{"created":"2018-10-20T06:58:26.532","id":59602386,"organisationUnit":{"id":"x1XzIawi5OP"},"validationRule":{"name":"Total  Very Severe Disease  ==  Referred Very Severe Disease","id":"sScFrbHDxiI","displayName":"Total  Very Severe Disease  ==  Referred Very Severe Disease","importance":"MEDIUM","description":"Total  Very Severe Disease  ==  Referred Very Severe Disease","validationRuleGroups":[]}},{"created":"2018-11-22T06:58:26.536","id":59602387,"organisationUnit":{"id":"WU9Lfp4rAP4"},"validationRule":{"name":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","id":"zyMfj4Fn7PV","displayName":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","instruction":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","importance":"HIGH","description":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","validationRuleGroups":[]}},{"created":"2018-10-20T06:58:26.574","id":59602388,"organisationUnit":{"id":"jLkdLxPxrlw"},"validationRule":{"name":"Total Anemia (0 - 5 years) >=Referred Anemia (0 - 5 years)","id":"bOTqWuIdG8F","displayName":"Total Anemia (0 - 5 years) >=Referred Anemia (0 - 5 years)","instruction":"Total Anemia (0 - 5 years) >=Referred Anemia (0 - 5 years)","importance":"LOW","description":"Total Anemia (0 - 5 years) >=Referred Anemia (0 - 5 years)","validationRuleGroups":[]}},{"created":"2018-10-20T06:58:26.574","id":59602389,"organisationUnit":{"id":"rByQ0rkukp2"},"validationRule":{"name":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","id":"zyMfj4Fn7PV","displayName":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","instruction":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","importance":"HIGH","description":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","validationRuleGroups":[]}},{"created":"2018-01-23T06:58:26.593","id":59602390,"organisationUnit":{"id":"aXzaJ1rhLjb"},"validationRule":{"name":"Lep_Refereed By HA/FWA/AHI/HI/Nurse/SACMO/Others Gov.Staff, Suspect Referred, Male>=Lep_Refereed By HA/FWA/AHI/HI/Nurse/SACMO/Others Gov.Staff, Case diagnosed, Male","id":"nPkL1L1nxxK","displayName":"Lep_Refereed By HA/FWA/AHI/HI/Nurse/SACMO/Others Gov.Staff, Suspect Referred, Male>=Lep_Refereed By HA/FWA/AHI/HI/Nurse/SACMO/Others Gov.Staff, Case diagnosed, Male","importance":"MEDIUM","description":"\nLep_Refereed By HA/FWA/AHI/HI/Nurse/SACMO/Others Gov.Staff, Suspect Referred, Male>=Lep_Refereed By HA/FWA/AHI/HI/Nurse/SACMO/Others Gov.Staff, Case diagnosed, Male","validationRuleGroups":[]}},{"created":"2018-11-12T06:58:26.622","id":59602391,"organisationUnit":{"id":"BuAYGDS2hj2"},"validationRule":{"name":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)>= Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","id":"afe9EJLtmhp","displayName":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)>= Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","instruction":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)== Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","importance":"MEDIUM","description":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)== Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","validationRuleGroups":[]}},{"created":"2018-10-20T06:58:26.625","id":59602392,"organisationUnit":{"id":"L1MEodlOr9T"},"validationRule":{"name":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","id":"zyMfj4Fn7PV","displayName":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","instruction":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","importance":"MEDIUM","description":"Total Low Birth Weight (within 72 hour of birth) >= Referred Low Birth Weight (within 72 hour of birth)","validationRuleGroups":[]}},{"created":"2018-10-20T06:58:26.648","id":59602393,"organisationUnit":{"id":"HIHo2Wo4wFs"},"validationRule":{"name":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)>= Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","id":"afe9EJLtmhp","displayName":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)>= Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","instruction":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)== Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","importance":"HIGH","description":"Total Severe Acute Malnutrition (SAM)  (6 month to 5 years)== Referred Severe Acute Malnutrition (SAM)  (6 month to 5 years)","validationRuleGroups":[]}}]};
                  for(var i = 0; i < data.validationResults.length; i++) { 
                    //if(allDownIdOrgUnits.indexOf(data.validationResults[i].organisationUnit.id) > -1) {
                     results.push(data.validationResults[i]);
                      
                    //}
                  }
                  // console.log("searchStatus in render: ", this.state.searchStatus);
                  let status = this.state.searchStatus;
                  generateTable(results,status);                 
                   
              });
            }); // end getOrgUnits
      });
      function generateTable(rules, searchStatus) {
          
          var parent = document.getElementById('app');         
          while (parent.firstChild) {
              parent.removeChild(parent.firstChild);
          }
          var ruleTable = document.createElement('div');          
          var ruleTable1 = document.createElement('div');          
          var ruleTable2 = document.createElement('div');          
          var ruleTable3 = document.createElement('div');          
          var table = "";
          var table1 = "";
          var table2 = "";
          var table3 = "";
          var name = "";
          var orgUnit = "";
          var instruction = "";
          var id = "";
          var date = "";
          var validationRuleGroupIds = [];
          let addLikeIcon = "";

          fetch(baseURL+'api/dataStore/userInteractionActionFeedback/' + user.id, fetchOptions)
          .then(res => res.json()) 
          .then(data => {  
              console.log("Data", data);
              if(data.httpStatusCode==404 || data.httpStatusCode ===  'undefined'){
                console.log("Data-404", data);
                userInteractedActions = data.interactedActions;
                for(var i = 0; i < rules.length; i++) {
                    validationRuleGroupIds = rules[i].validationRule.validationRuleGroups.map(function(obj){return obj.id;});
            
                    if(validationRuleGroupIds.indexOf(selectedGroup) > -1) {
                        if(!rules[i].validationRule.displayName) {
                            name = rules[i].validationRule.name;
                        } else {
                            name = rules[i].validationRule.displayName;
                        }

                        orgUnit = rules[i].organisationUnit.id;
                        
                        date = rules[i].created.split('-');
                        date = date[1] + "-" + date[0];
            
                        if(!rules[i].validationRule.instruction) {
                            instruction = rules[i].validationRule.description;
                        } else {
                            instruction = rules[i].validationRule.instruction;
                        }
            
                        id = rules[i].id + "";
                        if(userInteractedActions.indexOf(id) > -1) {
                            if(rules[i].validationRule.importance === 'HIGH') {
                                table += "<div class='panel panel-default high'>";
                                table += "<div class='panel-body'>";
                                table += "<b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                                table += "<p class='direction'>" + instruction + "</p>";
                                table += "<span style='float: right;'>" + date + "</span>";
                                table += "</div>";
                                table += "</div>";
                            } else if(rules[i].validationRule.importance === 'MEDIUM') {
                                table += "<div class='panel panel-default medium'>";
                                table += "<div class='panel-body'>";
                                table += "<b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                                table += "<p class='direction'>" + instruction + "</p>";
                                table += "<span style='float: right;'>" + date + "</span>";
                                table += "</div>";
                                table += "</div>";
                            } else if(rules[i].validationRule.importance === 'LOW') {
                                table += "<div class='panel panel-default low'>";
                                table += "<div class='panel-body'>";
                                table += "<b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                                table += "<p class='direction'>" + instruction + "</p>";
                                table += "<span style='float: right;'>" + date + "</span>";
                                table += "</div>";
                                table += "</div>";
                            }
                        } else {
                            if(rules[i].validationRule.importance === 'HIGH') {
                                table += "<div class='panel panel-default high'>";
                                table += "<div class='panel-body'>";
                                table += "<span class='glyphicon glyphicon-record' aria-hidden='true' style='color: rgb(218, 136, 136)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                                table += "<p class='direction'>" + instruction + "</p>";
                                table += "<span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px' onclick='feedbackShow(1, \"" + id + "\")'>   </span><span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' onclick='feedbackShow(0, \"" + id + "\")'></span>";
                                table += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary' onclick='feedbackSubmit(\"" + id + "\",\"" + name + "\",\"" + instruction.replace(/"/g, '') + "\")'>Submit</button><button type='button' class='btn btn-danger' onclick='feedbackShow(-1,\"" + id + "\")'>Cancel</button></div></div>";
                                table += "<span style='float: right;'>" + date + "</span>";
                                table += "</div>";
                                table += "</div>";
                            } else if(rules[i].validationRule.importance === 'MEDIUM') {
                                table += "<div class='panel panel-default medium'>";
                                table += "<div class='panel-body'>";
                                table += "<span class='glyphicon glyphicon-record' aria-hidden='true'style='color: rgb(253, 229, 77)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                                table += "<p class='direction'>" + instruction + "</p>";
                                table += "<span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px' onclick='feedbackShow(1, \"" + id + "\")'>   </span><span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' onclick='feedbackShow(0, \"" + id + "\")'></span>";
                                table += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary' onclick='feedbackSubmit(\"" + id + "\",\"" + name + "\",\"" + instruction.replace(/"/g, '') + "\")'>Submit</button><button type='button' class='btn btn-danger' onclick='feedbackShow(-1,\"" + id + "\")'>Cancel</button></div></div>";
                                table += "<span style='float: right;'>" + date + "</span>";
                                table += "</div>";
                                table += "</div>";
                            } else if(rules[i].validationRule.importance === 'LOW') {
                                table += "<div class='panel panel-default low'>";
                                table += "<div class='panel-body'>";
                                table += "<span class='glyphicon glyphicon-record' aria-hidden='true' style='color: rgb(221, 221, 221)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                                table += "<p class='direction'>" + instruction + "</p>";
                                table += "<span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px' onclick='feedbackShow(1, \"" + id + "\")'></span>   <span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' onclick='feedbackShow(0, \"" + id + "\")'></span>";
                                table += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary' onclick='feedbackSubmit(\"" + id + "\",\"" + name + "\",\"" + instruction.replace(/"/g, '') + "\")'>Submit</button><button type='button' class='btn btn-danger' onclick='feedbackShow(-1,\"" + id + "\")'>Cancel</button></div></div>";
                                table += "<span style='float: right;'>" + date + "</span>";
                                table += "</div>";
                                table += "</div>";
                            }
                        }
                    }
                }
            
                ruleTable.innerHTML = table;
                parent.appendChild(ruleTable);
                setDirection();
              } else {

                for(var i = 0; i < rules.length; i++) {
                  // Date splitting
                      let splitedDate = rules[i].created.split("T");
                      rules[i].created=splitedDate[0];
                      // Date sorting    
                        sortedRules = rules.sort((a, b) =>
                        a.created.split('/').reverse().join().localeCompare(b.created.split('/').reverse().join()))
                      
                        validationRuleGroupIds = sortedRules[i].validationRule.validationRuleGroups.map(function(obj){return obj.id;});
                      
                      //if(validationRuleGroupIds.indexOf(selectedGroup) > -1) {
                        if(!sortedRules[i].validationRule.displayName || sortedRules[i].validationRule.displayName === 'undefined') {
                            name = sortedRules[i].validationRule.name;
                        } else {
                            name = sortedRules[i].validationRule.displayName;
                        }
           
                        id = sortedRules[i].id;
                        orgUnit = sortedRules[i].organisationUnit.id;

                        date = sortedRules[i].created.split('T');
                        date = date[0];
                        if(!sortedRules[i].validationRule.instruction) {
                            instruction = sortedRules[i].validationRule.description;
                        } else {
                            instruction = sortedRules[i].validationRule.instruction;
                        }
                          
                        // Default datewise search 
                        if(searchStatus===1){
                          console.log("searchStatus in status-1: ", searchStatus);
                          if(sortedRules[i].validationRule.importance === 'HIGH') {
                              table += "<div class='panel panel-default high'>";
                              table += "<div class='panel-body'>";
                              table += "<span class='glyphicon glyphicon-record' aria-hidden='true'style='color: rgb(253, 229, 77)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                              table += "<p>" + instruction + "</p>";
                              table += "<button value="+id+" class='feedbackLike' /> <span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px'> </span> </button><button type='hidden' value="+id+" class='feedbackDisLike' /><span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' ></span></button>";
                              table += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary feedbacksubmit' value='"+id+"__"+ name+"__"+instruction+"'>Submit</button><button type='button' class='btn btn-danger feedbackcancel' value="+id+">Cancel</button></div></div>";
                              table += "<span style='float: right;'>" + date + "</span> <span style='float: right;font-size: 12px;margin-right:10px'>PRIORITY: " + sortedRules[i].validationRule.importance + " </span>";
                              table += "</div>";
                              table += "</div>";

                          } else if(sortedRules[i].validationRule.importance === 'MEDIUM') {
                              table += "<div class='panel panel-default medium'>";
                              table += "<div class='panel-body'>";
                              table += "<span class='glyphicon glyphicon-record' aria-hidden='true'style='color: rgb(253, 229, 77)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                              table += "<p>" + instruction + "</p>";
                              table += "<button type='hidden' value="+id+" class='feedbackLike' /> <span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px'> </span> </button><button type='hidden' value="+id+" class='feedbackDisLike' /><span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' ></span></button>";
                              table += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary feedbacksubmit' value='"+id+"__"+ name+"__"+instruction+"'>Submit</button><button type='button' class='btn btn-danger feedbackcancel' value="+id+">Cancel</button></div></div>";
                              table += "<span style='float: right;'>" + date + "</span> <span style='float: right;font-size: 12px;margin-right:10px'>PRIORITY: " + sortedRules[i].validationRule.importance + " </span>";
                              table += "</div>";
                              table += "</div>";
                          } else if(sortedRules[i].validationRule.importance === 'LOW') {
                              table += "<div class='panel panel-default low'>";
                              table += "<div class='panel-body'>";
                              table += "<span class='glyphicon glyphicon-record' aria-hidden='true'style='color: rgb(253, 229, 77)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                              table += "<p>" + instruction + "</p>";
                              table += "<button type='hidden' value="+id+" class='feedbackLike' /> <span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px'> </span> </button> <button type='hidden' value="+id+" class='feedbackDisLike' /><span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' ></span></button>";
                              table += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary feedbacksubmit' value='"+id+"__"+ name+"__"+instruction+"'>Submit</button><button type='button' class='btn btn-danger feedbackcancel' value="+id+">Cancel</button></div></div>";
                              table += "<span style='float: right;'>" + date + "</span> <span style='float: right;font-size: 12px;margin-right:10px'>PRIORITY: " + sortedRules[i].validationRule.importance + " </span>";
                              table += "</div>";
                              table += "</div>";
                          }
                        } // end of searchStatus-1
                        
                        if(searchStatus==2){
                           console.log("searchStatus in status-2: ", searchStatus);
                          if(sortedRules[i].validationRule.importance === 'HIGH') {
                              table1 += "<div class='panel panel-default high'>";
                              table1 += "<div class='panel-body'>";
                              table1 += "<span class='glyphicon glyphicon-record' aria-hidden='true'style='color: rgb(253, 229, 77)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                              table1 += "<p>" + instruction + "</p>";
                              table1 += "<button value="+id+" class='feedbackLike' /> <span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px'> </span> </button><button type='hidden' value="+id+" class='feedbackDisLike' /><span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' ></span></button>";
                              table1 += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary feedbacksubmit' value='"+id+"__"+ name+"__"+instruction+"'>Submit</button><button type='button' class='btn btn-danger feedbackcancel' value="+id+">Cancel</button></div></div>";
                              table1 += "<span style='float: right;'>" + date + "</span> <span style='float: right;font-size: 12px;margin-right:10px'>PRIORITY: " + sortedRules[i].validationRule.importance + " </span>";
                              table1 += "</div>";
                              table1 += "</div>";

                          } else if(sortedRules[i].validationRule.importance === 'MEDIUM') {
                              table2 += "<div class='panel panel-default medium'>";
                              table2 += "<div class='panel-body'>";
                              table2 += "<span class='glyphicon glyphicon-record' aria-hidden='true'style='color: rgb(253, 229, 77)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                              table2 += "<p>" + instruction + "</p>";
                              table2 += "<button value="+id+" class='feedbackLike' /> <span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px'> </span> </button><button type='hidden' value="+id+" class='feedbackDisLike' /><span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' ></span></button>";
                              table2 += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary feedbacksubmit' value='"+id+"__"+ name+"__"+instruction+"'>Submit</button><button type='button' class='btn btn-danger feedbackcancel' value="+id+">Cancel</button></div></div>";
                              table2 += "<span style='float: right;'>" + date + "</span> <span style='float: right;font-size: 12px;margin-right:10px'>PRIORITY: " + sortedRules[i].validationRule.importance + " </span>";
                              table2 += "</div>";
                              table2 += "</div>";
                          } else if(sortedRules[i].validationRule.importance === 'LOW') {
                              table3 += "<div class='panel panel-default low'>";
                              table3 += "<div class='panel-body'>";
                              table3 += "<span class='glyphicon glyphicon-record' aria-hidden='true'style='color: rgb(253, 229, 77)'> </span><b style='padding-bottom: 2px'> " + name + "</b><span style='float: right;font-size: 12px;'>" + userOrgUnitsName[orgUnit] + "</span>";
                              table3 += "<p>" + instruction + "</p>";
                              table3 += "<button value="+id+" class='feedbackLike' /> <span class='glyphicon glyphicon-thumbs-up up' aria-hidden='true' style='padding-right: 5px'> </span> </button><button type='hidden' value="+id+" class='feedbackDisLike' /><span class='glyphicon glyphicon-thumbs-down down' aria-hidden='true' ></span></button>";
                              table3 += "<div class='row' style='display: none;' id='" + id + "'><div class='col-xs-7'><input placeholder='Reason (Optional)' class='form-control' name='" + id + "' type='text'></div><div class='col-xs-5 text-right'><button type='button' class='btn btn-primary feedbacksubmit' value='"+id+"__"+ name+"__"+instruction+"'>Submit</button><button type='button' class='btn btn-danger feedbackcancel' value="+id+">Cancel</button></div></div>";
                              table3 += "<span style='float: right;'>" + date + "</span> <span style='float: right;font-size: 12px;margin-right:10px'>PRIORITY: " + sortedRules[i].validationRule.importance + " </span>";
                              table3 += "</div>";
                              table3 += "</div>";
                          }
                        } // end of searchStatus -2                     
                           
                }           
                
                if(searchStatus === 1){
                  ruleTable1.innerHTML = table;
                  parent.appendChild(ruleTable1);
                  // Click on like button
                  var feedbackLike = document.getElementsByClassName('feedbackLike');
                    for(let i = 0; i < feedbackLike.length; i++) {
                    feedbackLike[i].addEventListener("click", function(e) {
                      var feedbackValue = e.currentTarget.value;      
                      
                      feedbackShow(1,feedbackValue);
                    })
                  }

                  // Click on disLike button
                  var feedbackDisLike = document.getElementsByClassName('feedbackDisLike');
                  for(let i = 0; i < feedbackDisLike.length; i++) {
                    feedbackDisLike[i].addEventListener("click", function(e) {
                      var feedbackValue = e.currentTarget.value;      

                      feedbackShow(0,feedbackValue);
                    })
                  }
                  // feedback submit
                  var feedbacksubmit = document.getElementsByClassName('feedbacksubmit');
                  for(let i = 0; i < feedbacksubmit.length; i++) {
                    feedbacksubmit[i].addEventListener("click", function(e) {
                      var feedbackValue = e.currentTarget.value;      
                      var chunks = feedbackValue.split('__');
                      var splitedInfo = [chunks.shift(), chunks.shift(), chunks.join(' ')];
                      feedbackSubmit(splitedInfo[0],splitedInfo[1],splitedInfo[2]);
                    })
                  }
                  // feedback cancel 
                  var feedbackCancel = document.getElementsByClassName('feedbackcancel');
                  for(let i = 0; i < feedbackCancel.length; i++) {
                    feedbackCancel[i].addEventListener("click", function(e) {
                      var feedbackValue = e.currentTarget.value;      

                      feedbackShow(-1,feedbackValue);
                    })
                  }
                } 
               
                if(searchStatus === 2){
                  ruleTable1.innerHTML = table1;
                  ruleTable2.innerHTML = table2;
                  ruleTable3.innerHTML = table3;
                  parent.appendChild(ruleTable1);
                  parent.appendChild(ruleTable2);
                  parent.appendChild(ruleTable3);
                  // Click on like button
                  var feedbackLike = document.getElementsByClassName('feedbackLike');
                    for(let i = 0; i < feedbackLike.length; i++) {
                    feedbackLike[i].addEventListener("click", function(e) {
                      var feedbackValue = e.currentTarget.value;      
                      
                      feedbackShow(1,feedbackValue);
                    })
                  }

                  // Click on disLike button
                  var feedbackDisLike = document.getElementsByClassName('feedbackDisLike');
                  for(let i = 0; i < feedbackDisLike.length; i++) {
                    feedbackDisLike[i].addEventListener("click", function(e) {
                      var feedbackValue = e.currentTarget.value;      

                      feedbackShow(0,feedbackValue);
                    })
                  }
                  // feedback submit
                  var feedbacksubmit = document.getElementsByClassName('feedbacksubmit');
                  for(let i = 0; i < feedbacksubmit.length; i++) {
                    feedbacksubmit[i].addEventListener("click", function(e) {
                      var feedbackValue = e.currentTarget.value;      
                      var chunks = feedbackValue.split('__');
                      var splitedInfo = [chunks.shift(), chunks.shift(), chunks.join(' ')];
                      feedbackSubmit(splitedInfo[0],splitedInfo[1],splitedInfo[2]);
                    })
                  }
                  // feedback cancel 
                  var feedbackCancel = document.getElementsByClassName('feedbackcancel');
                  for(let i = 0; i < feedbackCancel.length; i++) {
                    feedbackCancel[i].addEventListener("click", function(e) {
                      var feedbackValue = e.currentTarget.value;      

                      feedbackShow(-1,feedbackValue);
                    })
                  }
                }            
                setDirection();
              }
          });    
            
          // console.log("Before rules loop: ", searchStatus);
        
      } // end generate table
      function setDirection() {
          if(userSettings && userSettings.keyUiLocale === 'ar') {
              var elements = document.getElementsByClassName("direction");
              for(var i = 0; i < elements.length; i++) {
                  elements[i].style.direction = "rtl";
              }
          }
      }

      //Gets users orgunits.
      function getOrgUnits() {          

          var promise1 = new Promise(function(resolve, reject) {
            fetch(baseURL+"api/organisationUnits.json?fields=id,name,children[id,name]&pageSize=5",fetchOptions) 
              .then(r => resolve(r.json()))
              .catch(err => reject(err));
          });
          return Promise.all([promise1]).then(function(data) {
            return data;
          }); 
      }     

    //Gets the validation results and kick starts table generation.
      function runValidation() {
          var promise1 = new Promise(function(resolve, reject) {
            fetch(baseURL+"api/validationResults.json?fields=id,organisationUnit,created,validationRule[id,displayName,name,description,instruction,importance,validationRuleGroups[id]]&paging=false",fetchOptions) 
              .then(r => resolve(r.json()))
              .catch(err => reject(err));
          });
          return Promise.all([promise1]).then(function(data) {
            return data;
            
          });
      }
    // Show feedback text box 
    function feedbackShow(type, id) {

        selectedFeedbackType = type;
        var element = document.getElementById(id);
        if (element.style.display === "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }  
    //Send feedback to data store.
    function feedback(type, id, name, instruction, message) {

      fetch(baseURL+'api/dataStore/actionFeedback/' + id, fetchOptions)
          .then(res => res.json()) 
          .then(data => {  
          console.log("Feedback Full Response: ",data);  
          console.log("Feedback create data.httpStatusCode: ",data.httpStatusCode);  
          if(data.httpStatusCode!==404 || (data.negative>=0 && data.positive>=0) || data.httpStatusCode ===  'undefined'){
            var positive = data.positive;
            var negative = data.negative;
            var positiveFeedbackMessages = data.positiveFeedbackMessages;
            var negativeFeedbackMessages = data.negativeFeedbackMessages;
            var feedbackInfo = data.feedbackInfo;
            
            if(!positive) {
                positive = 0;
            }

            if(!negative) {
                negative = 0;
            }

            /*if(!positiveFeedbackMessages && message || positiveFeedbackMessages && positiveFeedbackMessages.length === 0 && message) {
                positiveFeedbackMessages = [];
                if(type === 1) {
                    positiveFeedbackMessages.push(message);
                }
            } else if(positiveFeedbackMessages && message || positiveFeedbackMessages && positiveFeedbackMessages.length > 0 && message){
                if(type === 1) {
                    positiveFeedbackMessages.push(message);
                }
            } else if(!positiveFeedbackMessages && !message || positiveFeedbackMessages && positiveFeedbackMessages.length === 0 && !message){
                positiveFeedbackMessages = [];
            }
            if(!negativeFeedbackMessages && message || negativeFeedbackMessages && negativeFeedbackMessages.length === 0 && message) {
                negativeFeedbackMessages = [];
                if(type === 0) {
                    negativeFeedbackMessages.push(message);
                }
            } else if(negativeFeedbackMessages && message || negativeFeedbackMessages && negativeFeedbackMessages.length > 0 && message){
                if(type === 0) {
                    negativeFeedbackMessages.push(message);
                }
            } else if(!negativeFeedbackMessages && !message || negativeFeedbackMessages && negativeFeedbackMessages.length === 0 && !message){
                negativeFeedbackMessages = [];
            }*/

            positiveFeedbackMessages = JSON.stringify(positiveFeedbackMessages);
            negativeFeedbackMessages = JSON.stringify(negativeFeedbackMessages);

            if(!feedbackInfo) {
                feedbackInfo = {"name": name, "instruction": instruction};
            }

            feedbackInfo = JSON.stringify(feedbackInfo);
            console.log("Existing feedbackInfo: ", feedbackInfo);
            if(type === 1) {
                positive++;
                let jsonPayload = {positive:positive, negative: negative , positiveFeedbackMessages: positiveFeedbackMessages , negativeFeedbackMessages:negativeFeedbackMessages , feedbackInfo:feedbackInfo};
                
                fetch(baseURL+'api/dataStore/actionFeedback/' + id, Object.assign({}, fetchOptions, { method: "PUT", body: JSON.stringify(jsonPayload), dataType: 'application/json'})
                ).then(res => res.json()) 
                .then(response => {
                  console.log("response: ", response);
                  if(response.httpStatusCode==409 || response.httpStatusCode==401){
                    alert("Sorry! Conflict in data posting in update operation.");
                  } else if(response.httpStatusCode==500 || response.httpStatusCode==501){
                    alert("Sorry! Internal server error in update operation.");
                  }else if(response.httpStatusCode==200 || response.httpStatusCode==201){
                    alert("Congratulations! Your feedback has updated.");
                  }
                  setInteracted(id);
                }).catch(error => console.error(error));
            } else if(type === 0) {
              console.log("Existing: jsonPayload in type-0-Negative ",jsonPayload)
                negative++;

                let jsonPayload = {positive:positive, negative: negative , positiveFeedbackMessages: positiveFeedbackMessages , negativeFeedbackMessages:negativeFeedbackMessages , feedbackInfo:feedbackInfo};
                fetch(baseURL+'api/dataStore/actionFeedback/' + id, Object.assign({}, fetchOptions, { method: "PUT", body: JSON.stringify(jsonPayload), dataType: 'application/json'})
                ).then(res => res.json()) 
                .then(response => {
                  console.log("response: ", response);
                  if(response.httpStatusCode==409 || response.httpStatusCode==401){
                    alert("Sorry! Conflict in data posting in update.");
                  } else if(response.httpStatusCode==500 || response.httpStatusCode==501){
                    alert("Sorry! Internal server error in update operation.");
                  }else if(response.httpStatusCode==200 || response.httpStatusCode==201){
                    alert("Congratulations! Your feedback has updated.");
                  }
                  setInteracted(id);
                }).catch(error => console.error(error));
            }
          } else {
            var positive = 0;
            var negative = 0;
            var positiveFeedbackMessages = [];
            var negativeFeedbackMessages = [];
            var feedbackInfo = {"name": name, "instruction": instruction};
            console.log("New feedbck info: data ",feedbackInfo)
            if(message && type === 1) {
                positiveFeedbackMessages.push(message);
            } else if(message && type === 0) {
                negativeFeedbackMessages.push(message);
            }

            positiveFeedbackMessages = JSON.stringify(positiveFeedbackMessages);
            negativeFeedbackMessages = JSON.stringify(negativeFeedbackMessages);
            feedbackInfo = JSON.stringify(feedbackInfo);
            if(type === 1) {
              positive++;


                let jsonPayload = {positive:positive, negative: negative , positiveFeedbackMessages: positiveFeedbackMessages , negativeFeedbackMessages:negativeFeedbackMessages , feedbackInfo:feedbackInfo};

                fetch(baseURL+'api/dataStore/actionFeedback/' + id, Object.assign({}, fetchOptions, { method: "POST", body: JSON.stringify(jsonPayload), dataType: 'application/json'})
                ).then(res => res.json()) 
                .then(response => {
                  console.log("response: ", response);
                  if(response.httpStatusCode==409 || response.httpStatusCode==401){
                    alert("Sorry! Conflict in data posting.");
                  } else if(response.httpStatusCode==500 || response.httpStatusCode==501){
                    alert("Sorry! Internal server error.");
                  }else if(response.httpStatusCode==200 || response.httpStatusCode==201){
                    alert("Congratulations! Your feedback has added.");
                  }
                  setInteracted(id);
                }).catch(error => console.error(error));
            } else if(type === 0) {
                negative++;
                let jsonPayload = {positive:positive, negative: negative , positiveFeedbackMessages: positiveFeedbackMessages , negativeFeedbackMessages:negativeFeedbackMessages , feedbackInfo:feedbackInfo};
                fetch(baseURL+'api/dataStore/actionFeedback/' + id, Object.assign({}, fetchOptions, { method: "POST", body: JSON.stringify(jsonPayload), dataType: 'application/json'})
                ).then(res => res.json()) 
                .then(response => {
                  console.log("response: ", response);
                  if(response.httpStatusCode==409 || response.httpStatusCode==401){
                    alert("Sorry! Conflict in data posting.");
                  } else if(response.httpStatusCode==500 || response.httpStatusCode==501){
                    alert("Sorry! Internal server error.");
                  }else if(response.httpStatusCode==200 || response.httpStatusCode==201){
                    alert("Congratulations! Your feedback has added.");
                  }
                  setInteracted(id);
                }).catch(error => console.error(error));
            }
          } 
            
        }).catch(error => console.log(error));  
            
    }
    function feedbackSubmit(id, name, instruction) {
        var element = document.getElementsByName(id)[0];
        var message = element.value;
        if(!message && selectedFeedbackType >= 0) {
            feedback(selectedFeedbackType, id, name, instruction);
        } else if(selectedFeedbackType >= 0) {
            feedback(selectedFeedbackType, id, name, instruction, message);
        }

    } 

    //Set in data store that this user has interacted with this validation result.
    function setInteracted(id) {
        fetch(baseURL+'api/dataStore/userInteractionActionFeedback/' + user.id, fetchOptions)
          .then(res => res.json()) 
          .then(data => {
            var interactedActions = data.interactedActions;
            
            if(!interactedActions) {
                interactedActions = [];
            }
            
            interactedActions.push(id);
            userInteractedActions = interactedActions;
            var jsonConvertedArray = JSON.stringify(interactedActions);
            fetch(baseURL+"api/dataStore/userInteractionActionFeedback/" + user.id, Object.assign({}, fetchOptions, { method: "POST", body: "{\"interactedActions\":" + jsonConvertedArray + "}", dataType: 'application/json'})
            ).then(res => res.json()) 
            .then(response => {
              console.log("Interation Response: ", response)
              generateTable(results,1);
            });

          }).catch(error => console.error(error));  
  
    }
/*<ValidationResultsCard results={results} userOrgUnitsName = {userOrgUnitsName} title={title} searchStatus={this.state.searchStatus} resultsHigh={resultsHigh} resultsMedium={resultsMedium} resultsLow={resultsLow}/>*/

		return(

			<div> 
        
	      <Paper >
        <div className="AppBarTitle">
            <div className="ValidationsTitle" id="title">
              Action Name: {title} 
            </div> 
        </div> 
        <FormGroup row style={{'marginLeft': '11px'}}>
            <FormControlLabel
              disabled={this.state.disableDateWise}
              control={
                <Switch
                  checked={this.state.dateWiseSearch}
                  onChange={this.handleChangeDatewise('dateWiseSearch')}
                  value="dateWiseSearch"
                />
              }
              label="Date Wise"
            />
            <FormControlLabel
              disabled={this.state.disablePriority}
              control={
                <Switch
                  checked={this.state.prioritySearch}
                  onChange={this.handleChangePriority('prioritySearch')}
                  value={this.state.prioritySearch}
                  color="primary"
                />
              }
              label="Priortiy Wise"
            />
            <FormControlLabel
              disabled={this.state.disableLikeDislike} 
              control={
                <Switch
                  checked={this.state.checkedC}
                  onChange={this.handleChangeLikeDislike('checkedC')}
                  value="checkedC"
                />
              }
              label="Like/Dislike"
            />
        </FormGroup>

        
        <div id="app"></div>
        </Paper>	
			</div> 
		);
	}

}


export default GetValidationResults;