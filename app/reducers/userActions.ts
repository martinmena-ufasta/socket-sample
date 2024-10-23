export const userActions = {
    setName: (name: string) => ({type: "SET_NAME", name}),
    removeName: () => ({type: "REMOVE_NAME", name})
}