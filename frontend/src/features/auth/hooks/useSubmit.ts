import { useMutation } from "@tanstack/react-query";

import { createSubmission } from "../../problems/api/problemApi";

export function useSubmit() {
    return useMutation({
        mutationFn: ({
            problemId,
            language,
            code,
        }: {
            problemId: number;
            language: string;
            code: string;
        }) =>
            createSubmission(
                problemId,
                language,
                code
            ),
    });
}