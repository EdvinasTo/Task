import {
    Box,
    Typography,
    Button,
    Container,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%' }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontSize: '6rem',
                            fontWeight: 'bold',
                            color: 'primary.main',
                            marginBottom: 1,
                        }}
                    >
                        404
                    </Typography>

                    <Typography variant="h4" component="h2" gutterBottom color="text.primary">
                        Page Not Found
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ marginBottom: 3 }}
                    >
                        The page you're looking for doesn't exist or has been moved.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGoHome}
                            size="large"
                        >
                            Go Home
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleGoBack}
                            size="large"
                        >
                            Go Back
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default NotFoundPage;