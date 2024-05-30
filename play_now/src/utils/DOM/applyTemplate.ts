import { fieldRepr } from '@/utils/data/fieldRepr';

export function applyTemplate<
  WithObjectType extends object,
  ValuesType = WithObjectType[keyof WithObjectType]
>(htmlContent: string, withObject: WithObjectType): string {
  Object.entries(withObject).forEach((value: [string, ValuesType]) => {
    htmlContent = htmlContent.replaceAll(`{${value[0]}}`, fieldRepr(value[1]));
  });

  return htmlContent;
}
