import * as Dialog from "@radix-ui/react-dialog";

export const Modal = ({
  onChoice,
  title,
  description,
  buttonLabel = { optionA: "Yes", optionB: "No" },
  isModalOpen,
}: {
  onChoice: (choice: string) => void;
  title?: string;
  description?: string;
  isModalOpen: boolean;
  buttonLabel?: {
    optionA: string;
    optionB: string;
  };
}) => {
  const handleChoice = (
    choice: typeof buttonLabel.optionA | typeof buttonLabel.optionB
  ) => {
    onChoice(choice);
  };

  return (
    <Dialog.Root open={isModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-md transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Close
            asChild
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-gray-900"
          >
            <button
              aria-label="Close"
              onClick={() => handleChoice(buttonLabel.optionB)}
            >
              <span aria-hidden>X</span>
            </button>
          </Dialog.Close>
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-700">
            {description}
          </Dialog.Description>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => handleChoice(buttonLabel.optionA)}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              {buttonLabel.optionA}
            </button>
            <button
              onClick={() => handleChoice(buttonLabel.optionB)}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              {buttonLabel.optionB}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
