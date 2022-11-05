export type PickComplex<
  Source,
  RequiredProps extends keyof Omit<Source, PartialProps>,
  PartialProps extends keyof Omit<Source, RequiredProps>,
> = Required<Pick<Source, RequiredProps>> & Partial<Pick<Source, PartialProps>>;
