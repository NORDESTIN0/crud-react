import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Box,
    FormLabel,
    Input,
    Button,
  } from '@chakra-ui/react';
import { useState } from 'react';

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose}) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");

    const handleSave = () => {
        if (!name || !email) return;

        if (emailAlreadyExists()) {
            return alert("E-mail já está cadastrado!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email};
        }

    const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { name, email }]
        : [...(data ? data : [])];

    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
    
    setData(newDataArray);

    onClose();
};

 const emailAlreadyExists = () => {
    if (dataEdit.email !== email && data?.length) {
        return data.find((item) => item.email === email);
    }
//É LENGTH E NÃO LENGHT!!
        return false;
    }; 

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Clientes</ModalHeader>
                    <ModalCloseButton />
                        <ModalBody>
                            <FormControl display="flex" flexDir="column" gap={4}></FormControl>
                                <Box>
                                    <FormLabel>Nome</FormLabel>
                                    <Input 
                                        type='text'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel>Email</FormLabel>
                                    <Input 
                                        type='text'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={handleSave}>
                            SALVAR
                            </Button>
                            <Button colorScheme='red' mr={3} onClick={onClose}>
                            CANCELAR
                            </Button>
                        </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalComp;