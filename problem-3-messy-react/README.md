```js
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
```

### Issues and Improvement

1. `getPriority` function uses `any` type for blockchain parameter. This defeats typescript type safety and allows invalid values to be passed.

   - blockchain parameter should use specific type ex. string instead of any

2. `WalletBalance` interface does not define `blockchain`, yet the code references `balance.blockchain`

   - WalletBalance should include blockchain

3. `sortedBalances` references `lhsPriority` which is undefined

   - should be `balancePriority`

4. `sortedBalances` inverted filter condition

   - should filter balance amount with positive balance

5. `sortedBalances` includes `prices` as dependency even though prices are not used in the filter/sort logic.

   - remove unused `prices` dependency

6. `formattedBalances` was never used, instead rows maps over sortedBalances and expects FormattedWalletBalance

   - remove `formattedBalances` and on sortedBalances perform filter, sort, and map(to add fomatted amount) and use FormattedWalletBalance type

7. `rows` is recalculated on every render even though it only depends on `sortedBalances` and `prices`

   - wrap `rows` in useMemo to memoized it and add `sortedBalances` and `prices` as dependency

8. `WalletRow` is using array index as its key

   - keys should use stable unique keys, we can use concatenated string of `blockchain` and `currency`

9. switch in `getPriority` is error-prone

   - use lookup map, for cleaner and concise reference

10. `getPriority` is redefined on every render

    - we can move it outside the `WalletPage` component or import it as utils, or memoized it

11. `FormattedWalletBalance` type redundant property

    - extends `WalletBalance` instead and add `formatted` property

12. `classes.row` is not defined

    - remove it or add logic for dynamic styling
