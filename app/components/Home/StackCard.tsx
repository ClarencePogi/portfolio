import { Stack } from "@/app/types/global";
import { Badge } from "@primereact/ui/badge";
import { Card } from "@primereact/ui/card";

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function StackCard({ item }: { item: Stack }) {
    return <>
        <Card.Root className="
            border-t-4 border-t-blue-600 transition duration-300 
            ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl h-full">
            <Card.Body>
                <Card.Caption>
                    <Card.Title><h3 className="dark:text-white">{ item.title }</h3></Card.Title>
                </Card.Caption>
                <Card.Content>
                    <div className="grid grid-rows-[1fr_auto] gap-4">
                        <p className="text-md text-gray-400">{item.description}</p>
                        <div className="flex gap-2 w-full">
                            { item.technologies.map((tech, i) => (
                                <Badge key={i} size="large" severity={ i > 1 ? 'info' : 'secondary'}>{tech}</Badge>
                            )) }
                        </div>
                    </div>
                </Card.Content>
                <Card.Footer />
            </Card.Body>
        </Card.Root>
    </>
}