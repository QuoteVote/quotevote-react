import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import Quote from 'mui-pro/Typography/Quote'
import Muted from 'mui-pro/Typography/Muted'
import Primary from 'mui-pro/Typography/Primary'
import Info from 'mui-pro/Typography/Info'
import Success from 'mui-pro/Typography/Success'
import Warning from 'mui-pro/Typography/Warning'
import Danger from 'mui-pro/Typography/Danger'
import Heading from 'mui-pro/Heading/Heading'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'

const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
}

const useStyles = makeStyles(styles)

export default function Typography() {
  const classes = useStyles()
  return (
    <div>
      <Heading
        textAlign="center"
        title="Material Dashboard Heading"
        category="Created using Roboto Font Family"
      />
      <Card>
        <CardBody>
          <div className={classes.typo}>
            <div className={classes.note}>Header 1</div>
            <h1>The Life of Material Dashboard</h1>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Header 2</div>
            <h2>The Life of Material Dashboard</h2>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Header 3</div>
            <h3>The Life of Material Dashboard</h3>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Header 4</div>
            <h4>The Life of Material Dashboard</h4>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Header 5</div>
            <h5>The Life of Material Dashboard</h5>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Header 6</div>
            <h6>The Life of Material Dashboard</h6>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Paragraph</div>
            <p>
              I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers. I understand
              culture. I am the nucleus. I think that’s a responsibility that I
              have, to push possibilities, to show people, this is the level
              that things could be at.
            </p>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Quote</div>
            <Quote
              text="I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at."
              author=" Kanye West, Musician"
            />
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Muted Text</div>
            <Muted>
              I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers...
            </Muted>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Primary Text</div>
            <Primary>
              I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers...
            </Primary>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Info Text</div>
            <Info>
              I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers...
            </Info>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Success Text</div>
            <Success>
              I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers...
            </Success>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Warning Text</div>
            <Warning>
              I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers...
            </Warning>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Danger Text</div>
            <Danger>
              I will be the leader of a company that ends up being worth
              billions of dollars, because I got the answers...
            </Danger>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>Small Tag</div>
            <h2>
              Header with small subtitle
              <br />
              <small>
                Use
                {' '}
                {'"'}
                small
                {'"'}
                {' '}
                tag for the headers
              </small>
            </h2>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
