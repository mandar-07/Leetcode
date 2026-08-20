import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
    getProblem,
} from "../api/problemApi";

export default function ProblemDetails() {
    const { slug } = useParams();

    const {
        data: problem,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["problem", slug],
        queryFn: () => getProblem(slug!),
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <div className="text-white p-8">
                Loading...
            </div>
        );
    }

    if (isError || !problem) {
        return (
            <div className="text-red-400 p-8">
                Problem not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">

            <div className="max-w-4xl mx-auto">

                <div className="flex items-center gap-4 mb-6">

                    <h1 className="text-3xl font-bold">
                        {problem.id}. {problem.title}
                    </h1>

                    <span className="text-green-400">
                        {problem.difficulty}
                    </span>

                </div>

                <div className="space-y-6">

                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            Description
                        </h2>

                        <p className="text-gray-300">
                            {problem.description}
                        </p>
                    </section>

                    {problem.constraints && (
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                Constraints
                            </h2>

                            <p className="text-gray-300 whitespace-pre-line">
                                {problem.constraints}
                            </p>
                        </section>
                    )}

                    {problem.input_format && (
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                Input
                            </h2>

                            <p className="text-gray-300">
                                {problem.input_format}
                            </p>
                        </section>
                    )}

                    {problem.output_format && (
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                Output
                            </h2>

                            <p className="text-gray-300">
                                {problem.output_format}
                            </p>
                        </section>
                    )}

                </div>

            </div>

        </div>
    );
}