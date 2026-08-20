import api from "../../../shared/lib/api";

export type Problem = {
    id: number;
    title: string;
    slug: string;
    description: string;
    difficulty: string;
    constraints: string | null;
    input_format: string | null;
    output_format: string | null;
    created_at: string;
};

export const getProblems = async (): Promise<Problem[]> => {
    const response = await api.get("/problems");

    return response.data;
};

export const getProblem = async (
    slug: string
): Promise<Problem> => {
    const response = await api.get(`/problems/${slug}`);

    return response.data;
};