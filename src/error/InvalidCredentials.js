class IvalidCredentials extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCredentials';
    }
}

export default IvalidCredentials;