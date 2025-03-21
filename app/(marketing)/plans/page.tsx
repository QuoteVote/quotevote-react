'use client'

import { Box, Button, Card, CardContent, Container, Grid, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const plans = [
  {
    title: 'Personal',
    price: '$9.99',
    period: 'month',
    features: [
      'Create up to 50 quotes per month',
      'Vote on unlimited quotes',
      'Basic analytics',
      'Email support',
      'Ad-free experience'
    ],
    image: '/assets/img/PersonalPlanAvatar.png',
    cta: 'Get Started',
    popular: false
  },
  {
    title: 'Business',
    price: '$29.99',
    period: 'month',
    features: [
      'Everything in Personal',
      'Create unlimited quotes',
      'Advanced analytics',
      'Priority support',
      'Team collaboration',
      'API access'
    ],
    image: '/assets/img/BusinessPlanAvatar.png',
    cta: 'Start Free Trial',
    popular: true
  },
  {
    title: 'Investor',
    price: '$99.99',
    period: 'month',
    features: [
      'Everything in Business',
      'Custom branding',
      'Dedicated support',
      'Early access to features',
      'Investment opportunities',
      'Exclusive events'
    ],
    image: '/assets/img/InvestorPlanAvatar.png',
    cta: 'Contact Sales',
    popular: false
  }
]

export default function PlansPage() {
  const router = useRouter()
  const theme = useTheme()

  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Choose Your Plan
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Select the perfect plan for your needs. All plans include our core features with additional benefits as you upgrade.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  ...(plan.popular && {
                    border: `2px solid ${theme.palette.primary.main}`,
                    transform: 'scale(1.05)',
                    zIndex: 1
                  })
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 24,
                      right: -40,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      px: 4,
                      py: 1,
                      transform: 'rotate(45deg)',
                      transformOrigin: 'center',
                      zIndex: 1,
                      boxShadow: 2,
                      whiteSpace: 'nowrap',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      width: 150,
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 6 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 3
                    }}
                  >
                    <Image
                      src={plan.image}
                      alt={plan.title}
                      fill
                      style={{
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {plan.title}
                  </Typography>
                  <Typography variant="h3" component="div" gutterBottom>
                    {plan.price}
                    <Typography component="span" variant="subtitle1" color="text.secondary">
                      /{plan.period}
                    </Typography>
                  </Typography>
                  <Box sx={{ my: 4 }}>
                    {plan.features.map((feature) => (
                      <Typography
                        key={feature}
                        variant="body1"
                        sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Box
                          component="span"
                          sx={{
                            color: 'primary.main',
                            mr: 1
                          }}
                        >
                          ✓
                        </Box>
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => router.push('/signup')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" gutterBottom>
            Need a custom plan?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Contact us for enterprise solutions and custom requirements.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => router.push('/contact')}
          >
            Contact Sales
          </Button>
        </Box>
      </Container>
    </Box>
  )
} 