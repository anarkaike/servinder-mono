<?php

namespace Plugins\Users\Contracts;

use Plugins\Users\Types\UserType;

interface UserRepositoryInterface
{
    public function findById(string $id): ?UserType;
    public function findByEmail(string $email): ?UserType;
    public function create(array $data): UserType;
    public function update(string $id, array $data): bool;
    public function delete(string $id): bool;
}
