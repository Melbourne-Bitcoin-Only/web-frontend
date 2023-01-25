import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useTheme } from '@mui/material/styles';
import { Container, Tabs, Tab, Typography, Box, Button, Card, CardActions, CardContent, Grid, Chip, Stack } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { EVENTS, INTERNET_SOCIALS, RESOURCES } from './content';
import { compareAsc, format } from 'date-fns'
import { useMediaQuery } from 'react-responsive'

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const App = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const today = new Date()

  return (
    <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh' }}>
      <Container maxWidth={isMobile ? false : 'md'}>
          <Typography variant={isMobile ? 'h4' : 'h3'} align="center" sx={{p: 3}}>
            Melbourne Bitcoin Only
          </Typography>
          <Typography variant="body1" align="center" sx={{paddingBottom: 5}}>
            A friendly bitcoin community in Melbourne, Australia
          </Typography>
          <Container maxWidth={isMobile ? false : 'md'} disableGutters={isTabletOrMobile}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant={isMobile? 'scrollable' : 'fullWidth'}
                  aria-label="full width tabs"
                  scrollButtons
                  allowScrollButtonsMobile
                >
                  <Tab label="Story" {...a11yProps(0)} />
                  <Tab label="Connect" {...a11yProps(1)} />
                  <Tab label="Meetups" {...a11yProps(2)} />
                  <Tab label="Information Resources" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Typography variant="body1" align="center" sx={{p: 3}}>
                    Approximately 7 years ago, a company was started in Melbourne dedicated to Bitcoin education. However, soon the name changed to Blockchain Australia and it was no longer bitcoin focused, but blockchain focussed (the old adage 'Blockchain, not Bitcoin' was in vogue).
                    
                  </Typography>
                  <Typography variant="body1" align="center" sx={{p: 3}}>
                  A group of rogue bitcoiners met up with Stephan Livera one night in [insert season, year] and it was decided that a bitcoin only focussed group would be spawned in Melbourne.
                  </Typography>
                  <Typography variant="body1" align="center" sx={{p: 3}}>
                    Many shitcoins and a scandemic later, the bitcoin only group operates in a fairly decentralised manner but meeting up regularly (as of Summer 2022-2023).
                    While the group welcomes anyone from any background (and no discrimination for past shitcoinery), there is one main rule: bitcoin is the focus, not shitcoins.
                  </Typography>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {INTERNET_SOCIALS.map(social => (
                      <div style={{paddingTop: 10, paddingBottom: 15}}>
                      <Typography variant="h5" sx={{paddingBottom: 2}}>
                        {social.type}
                      </Typography>
                      <Button href={social.url} target="_blank" variant="contained" startIcon={<OpenInNewIcon />}>
                      {social.url}
                      </Button>
                      </div>
                  ))
                  }
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Typography variant="h4">
                    Upcoming
                  </Typography>
                  {EVENTS.filter(event => {
                    const eventDate = new Date(event.date)
                    const result = compareAsc(eventDate,today)
                    return result >= 0
                  }).map(event => {
                    const prettyEventDate = format(new Date(event.date), 'dd/MM/yyyy')
                    return (
                      <div style={{paddingBottom: 20, paddingTop: 20}}>
                        <Typography variant="body2">
                          {prettyEventDate}
                        </Typography>
                        <Typography variant="h5">
                          {event.title}
                        </Typography>
                        <Typography variant="body1">
                        {event.description}
                        </Typography>
                        <Typography variant="body1">
                        <b>Time:</b> {event.time}
                        </Typography>
                        <Typography variant="body1">
                        <b>Location:</b> {event.location}
                        </Typography>
                      </div>
                    )
                  })}
                  <Typography variant="h4" sx={{marginTop: 5}}>
                    Past
                  </Typography>
                  {EVENTS.filter(event => {
                    const eventDate = new Date(event.date)
                    const result = compareAsc(eventDate,today)
                    return result < 0
                  }).map(event => {
                    const prettyEventDate = format(new Date(event.date), 'dd/MM/yyyy')
                    return (
                      <div style={{paddingBottom: 20, paddingTop: 20}}>
                        <Typography variant="body2">
                          {prettyEventDate}
                        </Typography>
                        <Typography variant="h5">
                          {event.title}
                        </Typography>
                        <Typography variant="body1">
                        {event.description}
                        </Typography>
                        <Typography variant="body1">
                        Time: {event.time}
                        </Typography>
                      </div>
                    )
                  })}
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <Grid container spacing={2}>
                    {RESOURCES.map(resource => {
                      const {medium, url, title, description, category, isMelbourneOrigin, isAustralianOrigin, experienceLevelRequired} = resource;
                      return (
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined" >
                            <CardContent>
                              {isAustralianOrigin && (
                                <Stack direction="row" spacing={1} sx={{mb: 1.5}}>
                                    <Chip label="Australian" />
                                    {isMelbourneOrigin && (
                                      <Chip label="Melburnian" variant="outlined" />
                                    )}
                                </Stack>
                              )}
                              
                              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                              <b>Resource type:</b> {medium} | <b>Category:</b> {category} | <b>Experience required:</b> {experienceLevelRequired}
                              </Typography>
                              <Typography variant="h5" sx={{mb: 1.5}} component="div">
                              {title}
                              </Typography>
                              <Typography variant="body1">
                                {description}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button variant="contained" href={url} target="_blank" size="small">Visit</Button>
                            </CardActions>
                          </Card>
                        </ Grid>
                      )
                    })}
                  </Grid>
                </TabPanel>
            </Container>

      </Container>
    </Box>
  );
}

export default App;
