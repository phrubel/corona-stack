import React from 'react';
import './InfoCards.css'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



const InfoCards = ({ title, cases,flags, total }) => {
    
        return(
            <div>
                <Card className='card-style'boxShadow={3} >
                        {/* <CardMedia
                            component="img"
                            alt="Didnot find image"
                            height="140"
                            image={flags}
                            title="Contemplative Reptile"
                        /> */}
                        <CardContent>
                        <Typography className='card-title' gutterBottom variant="h5" component="h2">{title}  </Typography>

                            <Typography className='card-cases'  gutterBottom variant="h5" component="h2">Today: {cases}</Typography>

                            <Typography className='card-total'  variant="h6" color="textSecondary" component="h6">Total: {total}</Typography>
                        </CardContent>
               
                   
                </Card>
            </div>
        );
};

export default InfoCards;