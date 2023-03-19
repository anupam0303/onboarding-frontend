
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface cardParams {
    cardName: string,
    cardAlt: string,
    cardImage: string,
    navLink: string
}

export function ActionAreaCard(params: cardParams) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }} onClick={()=> navigate({pathname: params.navLink})}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={params.cardImage}
          alt={params.cardAlt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {params.cardName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}