import { Stack } from "@/app/types/global";
import { Badge } from "@primereact/ui/badge";
import { Card } from "@primereact/ui/card";

export default function StackCard({ item }: { item: Stack }) {
    return (
        <Card.Root
            className="
        h-full border-t-4 border-t-blue-600
        transition duration-300 ease-out
        md:hover:-translate-y-2 md:hover:scale-105 hover:shadow-xl
      "
        >
            <Card.Body>
                <Card.Caption>
                    <Card.Title>
                        <h3 className="text-lg sm:text-xl lg:text-2xl dark:text-white">
                            {item.title}
                        </h3>
                    </Card.Title>
                </Card.Caption>
                <Card.Content>
                    <div className="grid grid-rows-[1fr_auto] gap-3 sm:gap-4">
                        <p className="text-sm sm:text-base leading-relaxed text-gray-400">
                            {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full">
                            {item.technologies.map((tech, i) => (
                                <Badge
                                    key={i}
                                    size="large"
                                    severity={i > 1 ? "info" : "secondary"}
                                    className="text-xs sm:text-sm"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </Card.Content>
                <Card.Footer />
            </Card.Body>
        </Card.Root>
    );
}