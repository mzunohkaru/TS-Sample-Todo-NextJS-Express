// import axios from "axios";
// import useSWRMutation from "swr/mutation";
// import { API_URL } from "../../constants/url";

// function useToggleTodoCompleted(todoId: number, isCompleted: boolean) {
//   const toggleTodoCompleted = useSWRMutation(
//     `${API_URL}/${todoId}`,
//     async (url: string) => {
//       const response = await axios.put(
//         url,
//         { isCompleted: !isCompleted },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       return response.data;
//     },
//     {
//       onSuccess: () => {
//         console.log("Success");
//       },
//     }
//   );

//   return {
//     triggerToggle: toggleTodoCompleted.trigger,
//   };
// }

// export default useToggleTodoCompleted;
