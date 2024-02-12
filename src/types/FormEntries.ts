// step form interface on the welcome page
interface UserFormEntries {
  label: string,
  placeholder: string,
  type: string,
  action: (inputValue?: any) => void
}