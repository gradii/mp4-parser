export class DateHelper {
  public static convertNumber(secondsSince: number): Date {
    return new Date((secondsSince - 2082844800) * 1000);
  }

  /**
   * Converts a date as long to a mac date as long
   *
   * @param  date date to convert
   * @return  date in mac format
   */
  public static convertDate(date: Date): number {
    return ((n => n < 0 ? Math.ceil(n) : Math.floor(n))(date.getTime() / 1000)) + 2082844800;
  }
}

