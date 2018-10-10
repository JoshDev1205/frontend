import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import PriceTag from 'shared_components/Currency/PriceTag';
import { media } from 'libs/styled';
import BookedSuccessfullyPopup from '../BookedSuccessfullyPopup';
import StripeAutoPaymentButton from '../StripeAutoPaymentButton';
import StripeCardDetails from '../StripeCardDetails';
import CoinbaseButtonContainer from '../../CoinbaseButtonContainer';

const Wrap = styled.div`
  ${media.minSmall} {
    margin-top: 50px;
  }
  display: flex;
  justify-content: center;
`;

const GuestCountStyle = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const StripWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const CoinbaseButtonWrapper = styled.div`
  margin-top: 20px;
`;

export default class PaymentSection extends Component {
  static propTypes = {
    tripId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    pricePerPerson: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    onPaymentClick: PropTypes.func.isRequired,
    numberOfPerson: PropTypes.number.isRequired,
    onStripeTokenReceived: PropTypes.func.isRequired,
    guests: PropTypes.array.isRequired,
  };

  state = {
    canMakeAutoPayment: false,
  };

  setCanMakeAutoPayment = boolValue => {
    this.setState({ canMakeAutoPayment: boolValue });
  };

  render() {
    const {
      tripId,
      pricePerPerson,
      totalPrice,
      numberOfPerson,
      isLoading,
      onStripeTokenReceived,
      paymentError,
      guests,
    } = this.props;
    return (
      <Wrap>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column stretched>Guest(s)</Grid.Column>
            <Grid.Column textAlign="right">
              <GuestCountStyle>{numberOfPerson} Adults</GuestCountStyle>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column stretched>Total price per person</Grid.Column>
            <Grid.Column textAlign="right">
              <PriceTag price={pricePerPerson} unit="hidden" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column stretched>Total Price</Grid.Column>
            <Grid.Column textAlign="right">
              <PriceTag price={totalPrice} unit="hidden" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {totalPrice && (
                <StripWrap>
                  <PriceTag price={totalPrice}>
                    {({ convertedPrice, stripeMultiplier, selectedCurrency, symbol }) => {
                      const amount = parseFloat(convertedPrice);
                      return (
                        <React.Fragment>
                          <StripeAutoPaymentButton
                            key={selectedCurrency}
                            amount={amount}
                            stripeMultiplier={stripeMultiplier}
                            currency={selectedCurrency}
                            onStripeTokenReceived={onStripeTokenReceived}
                            canMakeAutoPayment={this.setCanMakeAutoPayment}
                          />
                          {paymentError && (
                            <ErrorMessage>
                              {paymentError.customMessage || paymentError.message}
                            </ErrorMessage>
                          )}
                          <StripeCardDetails
                            amount={amount}
                            symbol={symbol}
                            showOrInText={this.state.canMakeAutoPayment}
                          />
                          <CoinbaseButtonWrapper>
                            <CoinbaseButtonContainer tripId={tripId} guests={guests} />
                          </CoinbaseButtonWrapper>
                        </React.Fragment>
                      );
                    }}
                  </PriceTag>
                </StripWrap>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <BookedSuccessfullyPopup />
      </Wrap>
    );
  }
}
