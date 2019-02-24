import React, { Component } from 'react';
// Thumbs 
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
// Cards
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
class ValidationResultsCard extends Component{
	constructor(props){
		super();
		this.state = {
			validationResults : props.results,
			mergeredResultsArray : props.mergeredResultsArray,
		}

	}
	render(){
	
	return(

		<div>
		{
			this.props.searchStatus ===1 ?
			    this.state.validationResults.map((rules,i) => (
			        rules.validationRule.importance==='HIGH' ? 
			            <Card key={i} style={{ 'backgroundColor':'#EFDFDF'}} className="panel">
			             	<CardContent>
				                <Typography variant="h6" component="p">
				                  <span className='glyphicon glyphicon-record' aria-hidden='true' style={{'color': 'rgb(253, 229, 77)'}}> </span> 
				                  <b style={{'paddingBottom': '2px'}}> {rules.validationRule.name} </b>
								  <span style={{'float': 'right','fontSize': '12px'}}> { this.props.userOrgUnitsName[this.state.validationResults[i].organisationUnit.id] } </span>	
								</Typography>
				                <Typography variant="h5">
				                  
				                  {rules.validationRule.instruction}
				                </Typography>
			                </CardContent>
			                <CardActions>
				                <ThumbUp /><ThumbDown />
				                <Button size="small">CREATED: {rules.created}</Button>
				                <Button size="small">PRIORITY: {rules.validationRule.importance}</Button>
			              	</CardActions>
			            </Card>
			            : rules.validationRule.importance==='MEDIUM' ? 
			            <Card key={i} style={{ 'backgroundColor':'#FBF8E5'}} className="panel">
			                <CardContent>
				                <Typography variant="h6" component="p">
				                  <span className='glyphicon glyphicon-record' aria-hidden='true' style={{'color': 'rgb(253, 229, 77)'}}> </span> 
				                  <b style={{'paddingBottom': '2px'}}> {rules.validationRule.name} </b>
								  <span style={{'float': 'right','fontSize': '12px'}}> { this.props.userOrgUnitsName[this.state.validationResults[i].organisationUnit.id] } </span>	
								</Typography>
				                <Typography variant="h5">
				                  
				                  {rules.validationRule.instruction}
				                </Typography>
			                </CardContent>
			                <CardActions>
				                <ThumbUp /><ThumbDown />
				                <Button size="small">CREATED: {rules.created}</Button>
				                <Button size="small">PRIORITY: {rules.validationRule.importance}</Button>
			              	</CardActions>
			            </Card>
			            : <Card key={i} style={{ 'backgroundColor':'#F6F6F6'}} className="panel">
			                <CardContent>
				                <Typography variant="h6" component="p">
				                  <span className='glyphicon glyphicon-record' aria-hidden='true' style={{'color': 'rgb(253, 229, 77)'}}> </span> 
				                  <b style={{'paddingBottom': '2px'}}> {rules.validationRule.name} </b>
								  <span style={{'float': 'right','fontSize': '12px'}}> { this.props.userOrgUnitsName[this.state.validationResults[i].organisationUnit.id] } </span>	
								</Typography>
				                <Typography variant="h5">
				                  
				                  {rules.validationRule.instruction}
				                </Typography>
			                </CardContent>
			                <CardActions>
				                <ThumbUp /><ThumbDown />
				                <Button size="small">CREATED: {rules.created}</Button>
				                <Button size="small">PRIORITY: {rules.validationRule.importance}</Button>
			              	</CardActions>
			            </Card>
			    )) : this.props.searchStatus ===2 ? 
			    this.props.mergeredResultsArray.map((rules,i) => (
			        <Card key={i} style={{ 'backgroundColor':'#EFDFDF'}} className="panel">
		             	<CardContent>
			                <Typography variant="h6" component="p">
			                  <span className='glyphicon glyphicon-record' aria-hidden='true' style={{'color': 'rgb(253, 229, 77)'}}> </span> 
			                  <b style={{'paddingBottom': '2px'}}> {rules.validationRule.name} </b>
							  <span style={{'float': 'right','fontSize': '12px'}}> { this.props.userOrgUnitsName[this.state.validationResults[i].organisationUnit.id] } </span>	
							</Typography>
			                <Typography variant="h5">
			                  
			                  {rules.validationRule.instruction}
			                </Typography>
		                </CardContent>
		                <CardActions>
			                <ThumbUp /><ThumbDown />
			                <Button size="small">CREATED: {rules.created}</Button>
			                <Button size="small">PRIORITY: {rules.validationRule.importance}</Button>
		              	</CardActions>
		            </Card>
			    ))
			     : []

		} 
		</div>  	
	);
	}

}

export default ValidationResultsCard;