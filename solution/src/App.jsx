/* eslint-disable react/prop-types */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';

const checkSrc = './assets/check.png';
const cvvSrc = './assets/cvv.png';

const Title = styled(Typography)(() => ({
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '10px'
}));

const SubTitle = styled(Typography)(() => ({
  fontSize: '16px',
  color: '#1d1d1d',
  marginBottom: '15px'
}));

const HelperText = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'center'
}));

const DialogHeader = styled(DialogTitle)(() => ({
  padding: '15px 20px 5px',
}));

const textGrey = '#606060';

const RadioLabel = styled(FormLabel)(() => ({
  fontSize: '12px',
  fontWeight: '700',
  color: textGrey,
}));

const DialogGrid = styled(Grid)(() => ({
  padding: '0 20px 20px'
}));

const BorderGrid = styled(Grid)(({theme}) => ({
  border: `1px solid ${theme.palette.grey[400]}`,
  padding: '10px'
}));

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    loanAccountNumber: '',
    accountType: 'Checking',
    routingNumber: '',
    bankAccountNumber: '',
    confirmBankAccountNumber: '',
    cardNumber: '',
    nameOnCard: '',
    expirationDate: '',
    cvv: '',
  });
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isCheckingSelected = formData.accountType === 'Checking';

  const helperImage = isCheckingSelected ? checkSrc : cvvSrc;
  const helperImageText = isCheckingSelected ? 
    'Where can I find the routing and account number?' : 
    'Where can I find the CVV number?';

  const HelperImage = (
    <img 
      src={helperImage} 
      style={{
        height: '100%', 
        margin: 'auto', 
        maxWidth: '100%'
      }}
    />
  );

  const handleModalClick = () => setModalOpen(!modalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const SubmitButton = styled(Button)(() => ({
    fontSize: '14px',
    fontWeight: '700',
    borderRadius: '0',
    background: '#00a39e',
    padding: '15px 40px',
    marginTop: '30px',
    ...(isMobile && {
      width: '100%',
    })
  }));

  const CloseButton = styled(Button)(() => ({
    background: 'transparent',
    color: textGrey,
    position: 'absolute',
    top: '15px',
    right: '20px',
    ':hover': {
      outline: `1px solid ${textGrey}`,
    }
  }));

  const TextInput = (props) => (
    <TextField
      fullWidth
      required
      onChange={handleChange}
      InputProps={{
        style: {
          borderRadius: '0'
        },
      }}
      InputLabelProps={{
        style: {
          fontSize: '12px',
          fontWeight: '700',
          color: textGrey,
        }
      }}
      {...props}
    />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCheckingSelected) {
      const accountMatch = formData.bankAccountNumber === formData.confirmBankAccountNumber;
      if (!accountMatch) {
        setError(true);
        return;
      }
    }
    setModalOpen(true);
    // Handle form submission logic here
    console.log(formData, error);
  };

  return (
    <Box component='div' className='App'>
      <Box component='header'>
        <Title variant='h1'>
          One-time Loan Payment
        </Title>
        <SubTitle variant='subtitle1'>
          Fill out the form below to complete your payment.
        </SubTitle>
      </Box>
      <Box component='main'>
        <Box component='form' onSubmit={handleSubmit}>
          <Grid container spacing={0} sx={{alignItems: 'flex-start'}}>
            <Grid item xs={12}>
              {
                TextInput({
                  name: 'loanAccountNumber',
                  label: 'Loan Account Number',
                  value: formData.loanAccountNumber,
                })
              }
            </Grid>
            <Grid container item spacing={0} xs={12} md={8}>
              <BorderGrid item xs={12}>
                <FormControl component='fieldset'>
                  <RadioLabel component='legend'>Type of Account</RadioLabel>
                  <RadioGroup
                    row
                    aria-label='accountType'
                    name='accountType'
                    value={formData.accountType}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel value='Checking' control={<Radio />} label='Checking' />
                    <FormControlLabel value='Debit Card' control={<Radio />} label='Debit Card' />
                  </RadioGroup>
                </FormControl>
              </BorderGrid>
              {
                isCheckingSelected ? (
                  <>
                    <Grid item xs={12}>
                      {
                        TextInput({
                          name: 'routingNumber',
                          label: 'Routing Number',
                          value: formData.routingNumber,
                          inputProps: {
                            maxLength: '9',
                            pattern: '^[0-9]{9}$',
                          },
                          title: '9 digit number on the left side of a check'
                        })
                      }
                    </Grid>
                    <Grid item xs={12}>
                      {
                        TextInput({
                          name: 'bankAccountNumber',
                          label: 'Bank Account Number',
                          value: formData.bankAccountNumber,
                          inputProps: {
                            pattern: '^[0-9]+$',
                          },
                          title: 'Number following routing number on a check'
                        })
                      }
                    </Grid>
                    <Grid item xs={12}>
                      {
                        TextInput({
                          name: 'confirmBankAccountNumber',
                          label: 'Confirm Bank Account Number',
                          value: formData.confirmBankAccountNumber,
                          inputProps: {
                            pattern: '^[0-9]+$',
                          }
                        })
                      }
                    </Grid>
                    {error && (
                        <HelperText sx={{color: '#ce0c24'}}>
                          Bank Account Number and Confirm Bank Account Number must match
                        </HelperText>
                    )}
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      {
                        TextInput({
                          name: 'cardNumber',
                          label: 'Card Number',
                          value: formData.cardNumber,
                          inputProps: {
                            pattern: '^[0-9]+$',
                          }
                        })
                      }
                    </Grid>
                    <Grid item xs={12}>
                      {
                        TextInput({
                          name: 'nameOnCard',
                          label: 'Name On Card',
                          value: formData.nameOnCard,
                        })
                      }
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {
                        TextInput({
                          name: 'expirationDate',
                          label: 'Expiration Date',
                          value: formData.expirationDate,
                          placeholder: 'MM/YY'
                        })
                      }
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {
                        TextInput({
                          name: 'cvv',
                          label: 'CVV',
                          value: formData.cvv,
                          placeholder: 'XXX',
                          title: '3 digit number on back of your card'
                        })
                      }
                    </Grid>
                  </>
                )
              }
            </Grid>
            {/* Adding aria-hidden to the strictly visual aids,
            In production system I would advocate to add audio */}
            <BorderGrid item container xs={12} md={4} sx={{background: '#f4f7fc', height: '250px'}} aria-hidden='true'>
              <Grid item xs={12}>
                <HelperText>{helperImageText}</HelperText>
              </Grid>
              <Grid item container xs={12}>
                {HelperImage}
              </Grid>
            </BorderGrid>
            <Grid item xs={12}>
              <SubmitButton type='submit' variant='contained'>
                Make Payment
              </SubmitButton>
            </Grid>
          </Grid>
        </Box>
        <Dialog open={modalOpen} onClose={handleModalClick}>
          <CloseButton aria-label="close" onClick={handleModalClick}>
            <CloseIcon />
          </CloseButton>
          <DialogHeader>Thank you!</DialogHeader>
          <DialogGrid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>Your payment has been successful:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>
                Loan Account Number
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>
                {formData.loanAccountNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>
              Type of Payment Account
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>
              {formData.accountType}
              </Typography>
            </Grid>
            {
              isCheckingSelected ? (
                <>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Routing Number
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {formData.routingNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Account Number
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {formData.bankAccountNumber}
                    </Typography>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Card Number
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {formData.cardNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Name On Card
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {formData.nameOnCard}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Expiration Date
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {formData.expirationDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      CVV
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {formData.cvv}
                    </Typography>
                  </Grid>
                </>
              )
            }
            <Grid container item xs={12} sx={{justifyContent: 'flex-end'}}>
              <Button variant='contained' onClick={handleModalClick} sx={{background: '#00a39e'}}>
                Continue
              </Button>
            </Grid>
          </DialogGrid>
        </Dialog>
      </Box>
    </Box>
  );
};

export default LoanApplicationForm;