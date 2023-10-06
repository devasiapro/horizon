"""create client platform table

Revision ID: 0226c282fd64
Revises: f9e8eca12d44
Create Date: 2023-10-06 18:51:43.963890

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0226c282fd64'
down_revision: Union[str, None] = 'f9e8eca12d44'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'client_platform',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(64), nullable=False)
    )
    pass


def downgrade() -> None:
    op.drop_table('client_platform')
    pass
