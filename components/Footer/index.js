'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Container, Grid, IconButton } from '@mui/material'
import Image from 'next/image'

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}))

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

const SocialIcon = styled(Image)(({ theme }) => ({
  width: 24,
  height: 24,
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}))

export default function Footer() {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <LogoContainer>
              <Image
                src="/images/logo.svg"
                alt="QuoteVote Logo"
                width={32}
                height={32}
              />
              <LogoText variant="h6">QuoteVote</LogoText>
            </LogoContainer>
            <Typography variant="body2" color="text.secondary">
              Share and vote on your favorite quotes. Join our community of quote enthusiasts.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                component="a"
                href="https://twitter.com/quotevote"
                target="_blank"
                rel="noopener"
              >
                <SocialIcon
                  src="/svg/Twitter.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </IconButton>
              <IconButton
                component="a"
                href="https://facebook.com/quotevote"
                target="_blank"
                rel="noopener"
              >
                <SocialIcon
                  src="/svg/Facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com/quotevote"
                target="_blank"
                rel="noopener"
              >
                <SocialIcon
                  src="/svg/Instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} QuoteVote. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  )
} 