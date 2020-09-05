const requestAccessStyles = () => ({
  greenBtn: {
    textTransform: 'none',
    backgroundColor: '#00cf6e',
    color: 'white',
    float: 'right',
    '&:hover': {
      backgroundColor: '#00cf6e',
    },
  },
  header: {
    height: '41px',
    objectFit: 'contain',
    font: 'Montserrat',
    fontSize: '34px',
    fontWeight: 'bold',
    letterspacing: '0.25px',
  },
  subHeader: {
    height: '28px',
    font: 'Roboto',
    fontSize: '22px',
    letterspacing: '0.25px',
    lineHeight: 1.27,
  },
  stepNumber: {
    width: '22px',
    height: '28px',
    borderRadius: '6px',
    backgroundColor: '#00cf6e',
    opacity: 0.85,
    font: 'Roboto',
    fontsize: '18px',
    lineHeight: 1.56,
    color: '#ffffff',
    padding: '3px 6px',
  },
  stepName: {
    font: 'Roboto',
    fontsize: '18px',
    lineHeight: 1.56,
  },
  note: {
    font: 'Roboto',
    fontsize: '16px',
    lineHeight: 1.56,
    color: '#424556',
  },
  message: {
    font: 'Roboto',
    fontSize: 24,
    lineHeight: 1.25,
  }
})

export default requestAccessStyles
