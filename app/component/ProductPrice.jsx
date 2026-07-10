import { IntlProvider, FormattedNumber, FormattedCurrency } from 'react-intl';

const ProductPrice = ({ price, locale }) => {
  return (
    <IntlProvider locale={locale}>
      <div>
       <FormattedNumber
          value={price}
          style="currency"
          currency="TRY"
          // 🔽 Ondalık basamakları gizliyoruz:
          minimumFractionDigits={0}
          maximumFractionDigits={0}
        />
      </div>
    </IntlProvider>
  );
};

export default ProductPrice