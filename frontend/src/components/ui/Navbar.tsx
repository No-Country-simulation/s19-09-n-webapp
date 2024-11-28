import { AppBar, Box, Button, Container, Link, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled components
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
})

const NavLink = styled(Link)({
  color: '#333',
  fontWeight: 'bold',
  textDecoration: 'none',
  fontSize: '14px',
  marginLeft: '24px',
  '&:hover': {
    color: '#666',
  },
})


export default function Navbar() {
  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg" >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '8px 0' }}>
          {/* Logo section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="text" href="/" sx={{ fontWeight: 'bold', fontSize: '24px',color: '#604CC3' }}>
              Roomiefind
            </Button>
            {/* <img 
              src="/placeholder.svg?height=32&width=100" 
              alt="Mercado Libre"
              style={{ height: '32px', marginLeft: '8px' }}
            /> */}
          </Box>

          {/* Navigation section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink href="register">Crea tu cuenta</NavLink>
            <NavLink href="login">Ingresa</NavLink>
            <NavLink href="#">Ayuda</NavLink>
            <Button variant="outlined" href="login" sx={{ ml: 4 }}>
              Publica tu propiedad
              </Button>
            
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  )
}

